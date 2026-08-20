// test_tool - console self-check for LicenseAlgo + PrefsWriter (C#5 / net48)
// usage: test_tool.exe [workdir]   (default: %TEMP%\listary_tool_test)
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using ListaryLicense;

static class TestTool
{
    static int failures = 0;

    static void Check(bool cond, string what)
    {
        Console.WriteLine((cond ? "  [PASS] " : "  [FAIL] ") + what);
        if (!cond) failures++;
    }

    static void Main(string[] args)
    {
        // --gen <email>: print a single generated license (for cross-check scripts)
        if (args.Length == 2 && args[0] == "--gen")
        {
            Console.WriteLine(LicenseAlgo.Generate(args[1]));
            return;
        }
        if (args.Length == 2 && args[0] == "--debug")
        {
            // expose internal hashes for cross-checking against the Python reference
            Console.WriteLine("email=" + args[1]);
            Console.WriteLine("h1=" + LicenseAlgo.DebugH1(args[1]));
            Console.WriteLine("h2=" + LicenseAlgo.DebugH2(args[1]));
            Console.WriteLine("h3=" + LicenseAlgo.DebugH3(args[1]));
            Console.WriteLine("ck =" + LicenseAlgo.Checksum(args[1]));
            return;
        }
        Console.WriteLine("== LicenseAlgo self-check ==");
        string[] emails = new string[] {
            "test@listary.com", "Admin@Example.COM", "user.name+tag@mail.xyz",
            "a@b.cn", "x", "pro.user.20260815@example.com"
        };
        foreach (string e in emails)
        {
            string lic = LicenseAlgo.Generate(e);
            Check(lic.Length == 192, "len 192 for " + e);
            Check(LicenseAlgo.Verify(e, lic), "verify true for " + e);
            string bad = lic.Substring(0, 160) + "AAAAAAAAAAAAAAAAAAA" + lic.Substring(179);
            Check(!LicenseAlgo.Verify(e, bad), "wrong checksum rejected for " + e);
            Console.WriteLine("  key[" + e + "] = " + lic.Substring(0, 12) + "..." + lic.Substring(179));
        }
        // same email -> same checksum (deterministic), different random head
        string ck1 = LicenseAlgo.Checksum("abc@def.gh");
        string ck2 = LicenseAlgo.Checksum("ABC@DEF.GH");
        Check(ck1 == ck2, "checksum case-insensitive (abc@def.gh == ABC@DEF.GH)");
        Check(ck1.Length == 19, "checksum len 19");
        Check(ck1 == LicenseAlgo.Generate("abc@def.gh").Substring(160, 19), "generated key embeds checksum at [160:179]");

        Console.WriteLine();
        Console.WriteLine("== RandomEmail self-check ==");
        for (int i = 0; i < 20; i++)
        {
            string re = LicenseAlgo.RandomEmail();
            int at = re.IndexOf('@');
            Check(at > 0 && at < re.Length - 4 && re.IndexOf('.') > at,
                  "format ok: " + re);
            Check(re.StartsWith("user"), "prefix user: " + re);
            Check(LicenseAlgo.Verify(re, LicenseAlgo.Generate(re)), "generated key verifies for random email: " + re);
        }

        Console.WriteLine();
        Console.WriteLine("== PrefsWriter self-check ==");
        string work = args.Length > 0 ? args[0] : Path.Combine(Path.GetTempPath(), "listary_tool_test");
        if (Directory.Exists(work)) Directory.Delete(work, true);
        Directory.CreateDirectory(work);

        // sample mimicking real Preferences.json
        string sample = "{\r\n  \"FileSearchWindow\": { \"WindowWidth\": 1000, \"WindowHeight\": 720 },\r\n" +
                        "  \"Settings\": {\r\n    \"General.LauncherPositionX\": 475,\r\n" +
                        "    \"Appearance.Theme\": 2,\r\n    \"Tutorial.ShowMainV3\": false,\r\n" +
                        "    \"Listary5.ProLicense.Name\": \"old\",\r\n" +
                        "    \"Listary5.ProLicense.Email\": \"old@x.y\",\r\n" +
                        "    \"Listary5.ProLicense.Key\": \"OLDKEY\"\r\n  }\r\n}";
        string path = Path.Combine(work, "Preferences.json");
        File.WriteAllText(path, sample, Encoding.UTF8);

        string email = "fill.test.20260818@example.com";
        string lic2 = LicenseAlgo.Generate(email);
        StringBuilder log = new StringBuilder();
        string error;
        bool ok = PrefsWriter.Write(path, "Tester", email, lic2, log, out error);
        Check(ok, "Write returns true");
        foreach (string line in log.ToString().Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries))
            Console.WriteLine("    " + line);

        string[] read = PrefsWriter.Read(path);
        Check(read[0] == "Tester" && read[1] == email && read[2] == lic2, "Read back matches written values");
        string json = File.ReadAllText(path, Encoding.UTF8);
        Check(json.Contains("FileSearchWindow") && json.Contains("General.LauncherPositionX") && json.Contains("Appearance.Theme"),
              "other settings preserved after rewrite");
        Check(json.Contains("2") && json.Contains("false"), "int/bool values preserved");

        // case 2: file missing -> created
        string path2 = Path.Combine(work, "new", "Preferences.json");
        ok = PrefsWriter.Write(path2, "N", "n@n.n", LicenseAlgo.Generate("n@n.n"), new StringBuilder(), out error);
        Check(ok && File.Exists(path2), "creates missing file (with dirs)");

        // case 3: Settings missing -> created
        string path3 = Path.Combine(work, "nosettings.json");
        File.WriteAllText(path3, "{ \"Other\": { \"K\": 1 } }", Encoding.UTF8);
        ok = PrefsWriter.Write(path3, "N", "m@m.m", LicenseAlgo.Generate("m@m.m"), new StringBuilder(), out error);
        Check(ok && PrefsWriter.Read(path3)[1] == "m@m.m", "adds Settings object when absent");

        // case 4: corrupt file -> must refuse
        string path4 = Path.Combine(work, "corrupt.json");
        File.WriteAllText(path4, "{ not json at all", Encoding.UTF8);
        ok = PrefsWriter.Write(path4, "N", "c@c.c", LicenseAlgo.Generate("c@c.c"), new StringBuilder(), out error);
        Check(!ok && error != null, "corrupt file refused (" + error + ")");
        Check(File.ReadAllText(path4, Encoding.UTF8).StartsWith("{ not json"), "corrupt file untouched");

        // backup exists
        Check(File.Exists(path + ".bak"), "backup file created");

        Console.WriteLine();
        Console.WriteLine(failures == 0 ? "ALL PASS" : (failures + " FAILURES"));
        Environment.ExitCode = failures == 0 ? 0 : 1;
    }
}
