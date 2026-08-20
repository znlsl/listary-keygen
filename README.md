# Listary Pro 一键激活工具

> 开源仓库：https://github.com/LING71671/listary-keygen
> 正版购买：https://www.listary.com/pro

一个窗口完成 Listary Pro 许可证激活的 Windows GUI 工具，原理来自对
**`Listary.Core.Pro.LicenseChecker.CheckLicense`** 校验算法的逆向还原。

> **声明**：本项目仅供计算机逆向工程与软件安全机制的学习、研究与交流。请勿用于商业及未授权用途，生产环境请支持并购买 [Listary 正版授权](https://www.listary.com/pro)。

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
32 位哈希拼成 96 位值后按 5-bit 分组映射到 32 字符集；无 RSA 签名，173 字符不校验——
因此密钥可完全由 email 推导构造。完整原理（§2 校验流程、§3 三个哈希）与
**可亲手复算的工作示例**（§5.1，含中间哈希值/位布局表/19 组切片）见
[`docs/algorithm.md`](docs/algorithm.md)。

## 免责声明（Disclaimer）

1. **仅供学习与研究 (Educational & Research Purpose Only)**：
   本项目（包括源码、算法文档及编译产物）仅用于软件逆向工程、密码学分析与软件安全机制的学习、交流与学术研究，不具备任何破坏或绕过正版保护体系的商业意图。
2. **禁止商业与未授权用途 (Non-Commercial & Authorized Use Only)**：
   严禁将本项目中的任何代码、工具或衍生作品用于商业牟利、二次分发售卖或任何未经软件著作权方授权的环境中。
3. **支持正版软件 (Support the Original Software)**：
   本项目倡导并鼓励所有用户尊重开发者的知识产权与劳动成果。如需在日常或生产环境中长期使用，请前往 [Listary 官网 (https://www.listary.com/pro)](https://www.listary.com/pro) 购买正版授权。
4. **无担保与责任自负 (As-Is & Limitation of Liability)**：
   本项目按“现状 (AS IS)”提供，作者不提供任何形式的明示或暗示担保。使用者因使用、修改或传播本项目内容所产生的一切直接或间接法律责任、安全风险或数据损失，均由使用者自行承担，与本项目作者及贡献者无关。
5. **版权与合规联系 (Copyright Notice)**：
   本项目为独立的逆向安全分析产物，与 Listary 官方及其开发者无任何隶属、赞助或关联关系。如相关权利人认为本项目内容存在不妥之处，请提出 Issue 或通过邮件联系处理。