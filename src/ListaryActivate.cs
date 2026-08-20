// ListaryActivate - Listary Pro 一键激活工具（GUI）
// 单窗口完成：邮箱（手动/随机）→ 自动生成密钥 → 校验 → 检测 Listary 进程
//            → 备份 Preferences.json → 写入 Settings 三键 → 复读校验
// 底部常驻：免责声明 + 正版购买链接 + 开源仓库地址
// 编译：csc /nologo /target:winexe /codepage:65001 /out:ListaryActivate.exe
//       /r:System.dll /r:System.Drawing.dll /r:System.Windows.Forms.dll
//       /r:System.Web.Extensions.dll /r:System.Numerics.dll
//       ListaryActivate.cs LicenseAlgo.cs PrefsWriter.cs
using System;
using System.Diagnostics;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using ListaryLicense;

namespace ListaryActivateApp
{
    public class MainForm : Form
    {
        TextBox txtName;
        TextBox txtEmail;
        TextBox txtKey;
        TextBox txtConfigPath;
        TextBox txtLog;

        const string VERSION_TAG = "v1.0.0";
        const string REPO_URL = "https://github.com/your-name/listary-keygen";
        const string BUY_URL = "https://www.listary.com/pro";

        public MainForm()
        {
            Text = "Listary Pro 一键激活";
            Font = new Font("Microsoft YaHei UI", 9F);
            ClientSize = new Size(680, 500);
            StartPosition = FormStartPosition.CenterScreen;
            MaximizeBox = false;
            FormBorderStyle = FormBorderStyle.FixedSingle;

            int y = 12;
            Label lblName = new Label();
            lblName.Text = "用户名（Name）:";
            lblName.SetBounds(12, y, 200, 20);
            Controls.Add(lblName);
            txtName = new TextBox();
            txtName.SetBounds(220, y - 2, 448, 24);
            txtName.Text = "Pro User";
            Controls.Add(txtName);
            y += 34;

            Label lblEmail = new Label();
            lblEmail.Text = "邮箱（Email）:";
            lblEmail.SetBounds(12, y, 200, 20);
            Controls.Add(lblEmail);
            txtEmail = new TextBox();
            txtEmail.SetBounds(220, y - 2, 340, 24);
            Controls.Add(txtEmail);
            Button btnRandom = new Button();
            btnRandom.Text = "随机邮箱";
            btnRandom.SetBounds(568, y - 2, 100, 26);
            btnRandom.Click += delegate { AddRandomEmail(); };
            Controls.Add(btnRandom);
            y += 34;

            Label lblKey = new Label();
            lblKey.Text = "密钥（License）:";
            lblKey.SetBounds(12, y, 200, 20);
            Controls.Add(lblKey);
            txtKey = new TextBox();
            txtKey.SetBounds(220, y - 2, 448, 24);
            txtKey.Font = new Font("Consolas", 9F);
            Controls.Add(txtKey);
            y += 36;

            Button btnGen = new Button();
            btnGen.Text = "仅生成密钥";
            btnGen.SetBounds(220, y, 130, 28);
            btnGen.Click += delegate { GenerateKey(); };
            Controls.Add(btnGen);

            Button btnActivate = new Button();
            btnActivate.Text = "一键激活";
            btnActivate.SetBounds(360, y, 140, 28);
            btnActivate.BackColor = Color.FromArgb(215, 235, 215);
            btnActivate.Click += delegate { DoActivate(); };
            Controls.Add(btnActivate);
            y += 42;

            Label lblCfg = new Label();
            lblCfg.Text = "配置文件:";
            lblCfg.SetBounds(12, y, 200, 20);
            Controls.Add(lblCfg);
            txtConfigPath = new TextBox();
            txtConfigPath.SetBounds(220, y - 2, 340, 24);
            txtConfigPath.Text = PrefsWriter.DefaultPath();
            Controls.Add(txtConfigPath);
            Button btnBrowse = new Button();
            btnBrowse.Text = "浏览...";
            btnBrowse.SetBounds(568, y - 2, 100, 26);
            btnBrowse.Click += delegate { BrowseConfig(); };
            Controls.Add(btnBrowse);
            y += 40;

            txtLog = new TextBox();
            txtLog.Multiline = true;
            txtLog.ReadOnly = true;
            txtLog.ScrollBars = ScrollBars.Vertical;
            txtLog.Font = new Font("Consolas", 9F);
            txtLog.SetBounds(12, y, 656, 180);
            Controls.Add(txtLog);
            y += 192;

            Label lblWarn = new Label();
            lblWarn.Text = "仅供授权范围内的逆向学习与研究，请遵守 Listary 服务条款，勿用于未授权用途";
            lblWarn.ForeColor = Color.Silver;
            lblWarn.Font = new Font("Microsoft YaHei UI", 7.5F);
            lblWarn.SetBounds(12, y, 656, 18);
            Controls.Add(lblWarn);
            y += 20;

            Label lblLinks = new Label();
            lblLinks.Text = "正版购买: " + BUY_URL + "   |   开源仓库: " + REPO_URL + "   |   版本: " + VERSION_TAG;
            lblLinks.ForeColor = Color.Gray;
            lblLinks.Font = new Font("Microsoft YaHei UI", 7.5F);
            lblLinks.AutoEllipsis = true;
            lblLinks.SetBounds(12, y, 656, 18);
            Controls.Add(lblLinks);

            Log("就绪（v" + VERSION_TAG + "）。目标配置: " + PrefsWriter.DefaultPath());
            Log("提示：写入前请退出 Listary，否则退出时内存数据会覆盖新配置。");
        }

        void Log(string msg)
        {
            txtLog.AppendText("[" + DateTime.Now.ToString("HH:mm:ss") + "] " + msg + "\r\n");
        }

        void AddRandomEmail()
        {
            txtEmail.Text = LicenseAlgo.RandomEmail();
            Log("已生成随机邮箱: " + txtEmail.Text.Trim() + "（点“一键激活”或“仅生成密钥”继续）");
        }

        void GenerateKey()
        {
            string email = txtEmail.Text.Trim();
            if (email.Length == 0)
            {
                email = LicenseAlgo.RandomEmail();
                txtEmail.Text = email;
                Log("邮箱为空，已自动生成: " + email);
            }
            try
            {
                string lic = LicenseAlgo.Generate(email);
                if (!LicenseAlgo.Verify(email, lic))
                {
                    MessageBox.Show(this, "生成结果未通过自校验，请更换邮箱重试", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
                txtKey.Text = lic;
                Log("已为 " + email + " 生成密钥（" + lic.Length + " 字符），自校验通过（Verify=True）");
            }
            catch (Exception ex)
            {
                MessageBox.Show(this, "生成失败: " + ex.Message, "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        void BrowseConfig()
        {
            OpenFileDialog dlg = new OpenFileDialog();
            dlg.Filter = "JSON 文件 (*.json)|*.json|所有文件 (*.*)|*.*";
            dlg.FileName = txtConfigPath.Text;
            if (dlg.ShowDialog(this) == DialogResult.OK)
                txtConfigPath.Text = dlg.FileName;
        }

        void DoActivate()
        {
            string email = txtEmail.Text.Trim();
            string lic = txtKey.Text.Trim();

            // ensure email + key are present and match
            if (email.Length == 0)
            {
                email = LicenseAlgo.RandomEmail();
                txtEmail.Text = email;
                Log("邮箱为空，已自动生成: " + email);
            }
            if (lic.Length == 0)
            {
                Log("密钥为空，自动生成中...");
                GenerateKey();
                lic = txtKey.Text.Trim();
            }
            if (lic.Length != LicenseAlgo.LICENSE_LEN)
            {
                MessageBox.Show(this, "密钥长度应为 " + LicenseAlgo.LICENSE_LEN + " 字符，当前 " + lic.Length,
                                "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            if (!LicenseAlgo.Verify(email, lic))
            {
                Log("警告：密钥与邮箱不匹配，自动重新生成...");
                GenerateKey();
                lic = txtKey.Text.Trim();
                if (!LicenseAlgo.Verify(email, lic))
                {
                    MessageBox.Show(this, "密钥仍未通过校验，请更换邮箱或手动填入有效密钥", "错误",
                                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
            }

            string name = txtName.Text.Trim();
            if (name.Length == 0) name = "Pro User";

            // process check: writing while Listary is running gets overwritten on exit
            Process[] procs = Process.GetProcessesByName("Listary");
            if (procs.Length > 0)
            {
                DialogResult r = MessageBox.Show(this,
                    "Listary 正在运行（PID: " + procs[0].Id + "）。\r\n" +
                    "若现在写入，Listary 退出时内存数据可能覆盖新配置。\r\n\r\n" +
                    "建议先退出 Listary 再写入。仍然继续？",
                    "Listary 正在运行", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);
                if (r != DialogResult.Yes)
                {
                    Log("已取消写入（Listary 仍在运行）。请退出 Listary 后再试。");
                    return;
                }
            }

            string path = txtConfigPath.Text.Trim();
            StringBuilder log = new StringBuilder();
            string error;
            bool ok = PrefsWriter.Write(path, name, email, lic, log, out error);
            foreach (string line in log.ToString().Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries))
                Log(line);
            if (ok)
            {
                Log("完成：邮箱 " + email + " 的激活配置已写入。重启 Listary 后生效（Pro 状态）。");
                MessageBox.Show(this, "一键激活成功！\r\n\r\n邮箱: " + email + "\r\n配置文件: " + path +
                                "\r\n\r\n重启 Listary 后 Pro 状态生效。", "激活成功",
                                MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                MessageBox.Show(this, "写入失败: " + error + "\r\n\r\n原配置已保留（备份: " + path + PrefsWriter.BACKUP_SUFFIX + "）",
                                "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }

    static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new MainForm());
        }
    }
}