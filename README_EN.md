# Listary Pro One-Click Activation Tool

<p align="left">
  <a href="README.md">简体中文</a> | <b>English</b>
</p>

> Repository: https://github.com/LING71671/listary-keygen  
> Official Purchase: [Chinese Website (https://www.listary.net)](https://www.listary.net) ｜ [Global Website (https://www.listary.com/pro)](https://www.listary.com/pro)

A single-window Windows GUI tool for Listary Pro license generation and activation, reconstructed from the reverse-engineering analysis of the **`Listary.Core.Pro.LicenseChecker.CheckLicense`** validation algorithm.

> **Notice**: This project is for computer reverse-engineering and software security research/educational purposes only. Do NOT use for unauthorized or commercial purposes. For production environments, please purchase a genuine license from the [Listary Official Website](https://www.listary.net).

## Features

`ListaryActivate.exe` (Single-window, one-click workflow):

1. **Email**: Enter manually, or click "Random Email" (`user<8 random alphanumeric>@domain`).
2. **License Key**: Click "Generate Key Only" or "One-Click Activate" — generates a 192-character license key according to the algorithm and performs self-validation (`Verify = True`).
3. **Configuration Writing**: Automatically writes settings upon validation:
   - Detects running Listary processes (warns that memory state will overwrite settings on exit).
   - Automatically backs up `Preferences.json.bak`.
   - Writes `Listary5.ProLicense.Name`, `Listary5.ProLicense.Email`, and `Listary5.ProLicense.Key` to the `Settings` block.
   - Re-reads and verifies the configuration to ensure persistence.
4. Restart Listary to take effect (Pro status activated).

## Quick Start

```powershell
# Option 1: Use pre-compiled binaries
.\tools\ListaryActivate.exe

# Option 2: Build from source (Windows + .NET Framework 4.8 built-in csc, zero external dependencies)
powershell -ExecutionPolicy Bypass -File build.ps1
.\tools\test_tool.exe   # Run self-check (Expected: ALL PASS)
```

Configuration File Path: `%APPDATA%\Listary\UserProfile\Settings\Preferences.json`  
(Automatically backed up as `.bak` before modification; only the three license keys are updated while preserving all other user preferences).

## Project Structure

```
listary-keygen/
├── README.md                    # Chinese documentation (Default)
├── README_EN.md                 # English documentation (This file)
├── src/
│   ├── ListaryActivate.cs       # One-click GUI activation tool (Keygen + Prefs Writer)
│   ├── LicenseAlgo.cs           # Core algorithm (H1/H2/H3/Checksum/Generate/Verify/RandomEmail)
│   └── PrefsWriter.cs           # Configuration writing & backup logic (Decoupled from UI)
├── tools/                       # Pre-compiled executables (.NET Framework 4.8, zero dependencies)
│   ├── ListaryActivate.exe
│   └── test_tool.exe
├── tests/
│   └── test_tool.cs             # Console self-test & assertion suite (includes --gen / --debug flags)
├── docs/
│   ├── algorithm.md             # CheckLicense algorithm analysis (Constants, hashes, bit layout, weaknesses)
│   └── reverse-engineering.md   # Reverse engineering methodology (Protection mechanisms, unpacking, dump)
├── build.ps1                    # One-click build script
└── LICENSE                      # MIT License
```

## Algorithm Summary

The license key is a 192-character string, but only `license[160:179]` (19 characters) is validated by the application:
- Formed by three custom 32-bit hashes derived from the lowercase email address (`H1`, `H2`, `H3`).
- Combined into a 96-bit value and sliced into 19 5-bit groups mapped to a 32-character Base32 alphabet.
- No public-key cryptographic signature (e.g. RSA) is used, and 173 out of 192 characters are arbitrary padding.
- Therefore, valid license keys can be generated entirely offline from any email address.

For complete mathematical details, bit-layout tables, and step-by-step worked examples, see [`docs/algorithm.md`](docs/algorithm.md).

## Disclaimer

1. **Educational & Research Purpose Only**:  
   This project (including source code, algorithm analysis documentation, and compiled binaries) is intended solely for educational, academic, and security research purposes related to software reverse engineering and cryptography.
2. **Non-Commercial & Authorized Use Only**:  
   Strictly prohibited from being used for commercial profit, unauthorized distribution, or in unauthorized commercial/production environments.
3. **Support the Original Software**:  
   We encourage and advocate respecting intellectual property rights. If you find Listary useful in your daily workflow or production environment, please support the developer by purchasing a genuine license from [Listary Official Website (https://www.listary.net)](https://www.listary.net) or [Global Store (https://www.listary.com/pro)](https://www.listary.com/pro).
4. **As-Is & Limitation of Liability**:  
   This software and documentation are provided "AS IS", without warranty of any kind. The authors and contributors shall not be liable for any claims, damages, legal liabilities, or losses arising from the use, modification, or distribution of this software. Users assume all risks and responsibilities.
5. **Copyright & Compliance**:  
   This project is an independent research work and has no affiliation, sponsorship, or association with the official Listary team. If you are a copyright holder with inquiries or requests, please open an Issue or contact via email.
