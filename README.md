# Listary Pro License Keygen & Filler

> 开源仓库：https://github.com/your-name/listary-keygen （发布后替换为真实地址；GUI 底部与本文档同步更新）

基于对 **Listary Pro 订阅许可证校验算法（`LicenseChecker.CheckLicense`）** 的逆向还原，
提供两个 Windows GUI 工具 + 完整的算法原理文档。

- **工具一（Keygen）**：输入邮箱（支持批量、一键随机邮箱）→ 生成 192 字符许可证密钥
- **工具二（Filler）**：把邮箱/密钥写入 Listary 配置文件（自动备份 + 复读校验）→ 重启 Listary 生效

> **法律声明**：本项目仅用于授权范围内的逆向工程学习与研究。使用激活密钥违反
> Listary 服务条款，请勿用于未授权用途；请在自有的、允许离线激活的环境中使用。

## 功能特性

| 工具 | 功能 |
|---|---|
| `ListaryKeyGen.exe` | 单个/批量邮箱生成密钥；`随机邮箱` 按钮一键生成合法格式邮箱；生成结果实时自校验（Verify=True）；复制 / 导出 CSV |
| `ListaryKeyFill.exe` | 仅填写（无生成功能）：粘贴邮箱+密钥 → 校验（长度 192 + email-key 匹配）→ 检测 Listary 进程（运行中警告，防止退出时内存覆盖）→ 备份 `Preferences.json.bak` → 写入 `Settings` 三键 → 复读校验 |
| `test_tool.exe` | 控制台自检：20+ 项算法断言 + 配置文件写入全流程断言（含损坏文件拒写、缺文件新建等边界） |

## 快速开始（使用预编译 exe）

1. `tools/ListaryKeyGen.exe` — 输入邮箱 → `生成密钥` → `复制全部`
2. 退出 Listary → 打开 `tools/ListaryKeyFill.exe` → 粘贴邮箱和密钥 → `写入配置`
3. 启动 Listary，Pro 状态生效

配置文件位置：`%APPDATA%\Listary\UserProfile\Settings\Preferences.json`
（首次已有配置会被自动备份为 `.bak`；全部历史配置保留，只更新三键）。

## 构建（从源码编译）

环境：Windows + .NET Framework 4.8（自带 `csc.exe`，无需安装任何东西）。

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1
# 产物输出到 tools/：ListaryKeyGen.exe / ListaryKeyFill.exe / test_tool.exe
```

## 测试

```powershell
.\tools\test_tool.exe
# 期望输出：ALL PASS
```

自检覆盖：算法（长度/校验串/大小写不敏感/错误 key 拒绝/随机邮箱格式）+
配置文件写入（保留其他设置、int/bool 保真、新建、补建 Settings、损坏拒写、备份生成）。

## 目录结构

```
listary-keygen/
├── README.md                    # 本文件
├── src/                         # C# 源码（C#5 / net48，csc 编译）
│   ├── LicenseAlgo.cs           #   算法核心（H1/H2/H3/Checksum/Generate/Verify/随机邮箱）
│   ├── ListaryKeyGen.cs         #   密钥生成器 GUI
│   ├── ListaryKeyFill.cs        #   密钥填写器 GUI（仅填写）
│   └── PrefsWriter.cs           #   配置写入逻辑（备份/解析/写回/校验，与 UI 解耦）
├── tools/                       # 预编译 exe（.NET Framework 4.8，零依赖，双击即用）
├── tests/
│   └── test_tool.cs             #   控制台自检（也是交叉验证的 --gen/--debug 接口）
├── docs/
│   ├── algorithm.md             # CheckLicense 算法原理（常量/哈希/校验串/弱点）
│   └── reverse-engineering.md   # 逆向方法论（保护机制/动态解壳/还原步骤）
├── build.ps1                    # 一键构建脚本
└── LICENSE                      # MIT
```

## 算法原理（摘要）

`CheckLicense(email, license)` 的关键：密钥共 **192 字符**，其中仅 `license[160:179]`
（19 字符）参与校验，由 email 的 3 个自定义 32 位哈希拼成 96 位值后按 5-bit 分组映射到
32 字符集；其余 173 字符完全不校验，且无 RSA/公钥签名——因此密钥可**完全由 email 推导构造**。
详见 [`docs/algorithm.md`](docs/algorithm.md)。

## 免责声明

- 本项目为独立研究产物，与 Listary 官方、其开发者无任何关联。
- 请勿将生成的密钥用于商业或未授权用途；后果自负。