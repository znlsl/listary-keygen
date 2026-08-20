# Listary Pro 一键激活工具

> 开源仓库：https://github.com/your-name/listary-keygen （发布后替换为真实地址；GUI 底部与本文档同步更新）
> 正版购买：https://www.listary.com/pro

一个窗口完成 Listary Pro 许可证激活的 Windows GUI 工具，原理来自对
**`Listary.Core.Pro.LicenseChecker.CheckLicense`** 校验算法的逆向还原。

> **法律声明**：本项目仅用于授权范围内的逆向工程学习与研究。使用激活密钥违反
> Listary 服务条款，请勿用于未授权用途；请在自有的、允许离线激活的环境中使用。

## 功能

`ListaryActivate.exe`（单窗口，一键流程）：

1. **邮箱**：手动输入，或点「随机邮箱」一键生成（`user<8位随机>@常用域名`）
2. **密钥**：点「仅生成密钥」或直接点「一键激活」——按算法自动生成 192 字符密钥并自校验（Verify=True）
3. **写入**：校验通过后自动完成
   - 检测 Listary 进程（运行中会警告：程序退出时内存数据会覆盖配置）
   - 备份 `Preferences.json.bak`
   - 写入 `Settings` 的 `Listary5.ProLicense.Name / .Email / .Key` 三键
   - 复读校验，确认写入成功
4. 重启 Listary，Pro 状态生效

窗口底部常驻：免责声明 + 正版购买链接 + 开源仓库地址 + 版本号。

## 快速开始

```powershell
# 方式一：直接用预编译程序
.\tools\ListaryActivate.exe

# 方式二：从源码构建（Windows + .NET Framework 4.8 自带 csc，零依赖）
powershell -ExecutionPolicy Bypass -File build.ps1
.\tools\test_tool.exe   # 自检（期望 ALL PASS）
```

配置文件位置：`%APPDATA%\Listary\UserProfile\Settings\Preferences.json`
（写入前自动备份为 `.bak`；仅更新三键，其余设置原样保留）。

## 目录结构

```
listary-keygen/
├── README.md                    # 本文件
├── src/
│   ├── ListaryActivate.cs       # 一键激活 GUI（生成 + 填写一体化）
│   ├── LicenseAlgo.cs           # 算法核心（H1/H2/H3/Checksum/Generate/Verify/随机邮箱）
│   └── PrefsWriter.cs           # 配置写入逻辑（备份/解析/写回/校验，与 UI 解耦）
├── tools/                       # 预编译 exe（.NET Framework 4.8，零依赖，双击即用）
│   ├── ListaryActivate.exe
│   └── test_tool.exe
├── tests/
│   └── test_tool.cs             # 控制台自检（算法 + 写入流程断言，含 --gen/--debug 模式）
├── docs/
│   ├── algorithm.md             # CheckLicense 算法原理（常量/哈希/校验串/弱点分析）
│   └── reverse-engineering.md   # 逆向方法论（保护机制/动态解壳/还原步骤）
├── build.ps1                    # 一键构建脚本
└── LICENSE                      # MIT
```

## 算法原理（摘要）

密钥共 192 字符，仅 `license[160:179]`（19 字符）参与校验：由 email 的 3 个自定义
32 位哈希拼成 96 位值后按 5-bit 分组映射到 32 字符集；无 RSA 签名，其余 173 字符不校验——
因此密钥可完全由 email 推导构造。详见 [`docs/algorithm.md`](docs/algorithm.md)。

## 免责声明

- 本项目为独立研究产物，与 Listary 官方及其开发者无任何关联。
- 请勿将生成的密钥用于商业或未授权用途；后果自负。