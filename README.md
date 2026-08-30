# Listary Pro 一键激活工具

<p align="left">
  <b>简体中文</b> | <a href="README_EN.md">English</a>
</p>

> 开源仓库：https://github.com/LING71671/listary-keygen  
> 正版购买：[中文官网 (https://www.listary.net)](https://www.listary.net) ｜ [国际官网 (https://www.listary.com/pro)](https://www.listary.com/pro)

一个窗口完成 Listary Pro 许可证激活的 Windows GUI 工具，原理来自对
**`Listary.Core.Pro.LicenseChecker.CheckLicense`** 校验算法的逆向还原。

> **声明**：本项目仅供计算机逆向工程与软件安全机制的学习、研究与交流。请勿用于商业及未授权用途，生产环境请支持并购买 [Listary 正版授权](https://www.listary.net)。

---

## ⚠️ 重要原理说明：为什么必须通过工具写入配置？

很多用户会尝试复制生成的激活码，然后打开 Listary 软件设置界面手动粘贴，结果**提示许可证无效**。这是正常现象，原因如下：

| 激活途径 | 校验机制 | 结果 |
| :--- | :--- | :--- |
| **在 Listary 界面手动输入激活码** | **强制发起联网请求**，向 Listary 官方服务器核对订单与授权库 | ❌ **提示无效**（算号器生成的离线密钥不存在于官方云端数据库） |
| **通过本工具写入 `Preferences.json` 配置文件** | 启动时调用内部 **`CheckLicense` 本地密码学哈希离线校验** | ✅ **激活成功**（本地算法自包含，100% 离线通过） |

> **正确用法**：无需在 Listary 界面手动输入任何激活码，直接运行 `ListaryActivate.exe` 点击**「一键激活」**写入配置文件，然后**重启 Listary** 即可直接生效。

---

## 功能

`ListaryActivate.exe`（单窗口，一键流程）：

1. **邮箱**：手动输入，或点「随机邮箱」一键生成（`user<8位随机>@常用域名`）
2. **密钥**：点「仅生成密钥」或直接点「一键激活」——按算法自动生成 192 字符密钥并自校验（Verify=True）
3. **写入**：校验通过后自动完成
   - 检测 Listary 进程（运行中会提示并自动处理，避免退出时内存数据覆盖配置）
   - 备份 `Preferences.json.bak`
   - 写入 `Settings` 的 `Listary5.ProLicense.Name / .Email / .Key` 三键
   - 复读校验，确认写入成功
4. 重启 Listary，Pro 状态自动生效

## 为什么会被联网回退（v1.0.0 用户反馈）

反编译 `ProService.ScheduleAutoCheck` 发现的回退机制：

```
Listary 启动 → 15 分钟后 POST account.listary.com/api/v1/activate（在线校验本机 email+key）
  → 校验失败（InvalidLicense）→ 记录 LastProCheckFailDate 到 Preferences.json
  → 之后每次启动校验失败且距首次失败 > 7 天 → 清空 ProLicense 三键（回退！）
```

注意 `LastProCheckFailDate` 在 JSON 里**伪装成 `LastUpdateTimeV1`** 键名存储。

**v1.0.1 的双重防护**（本工具自动完成）：

1. **写入激活配置时同步重置 `LastUpdateTimeV1` → MinValue**——7 天倒计时永远从零开始
2. **「屏蔽激活服务器」按钮**：往 hosts 写入 `0.0.0.0 account.listary.com`（UAC 提权）。
   屏蔽后在线校验网络异常 → 反编译确认 `UnknownError` 分支**无任何操作** → 永不清空；
   本地离线校验（`CheckLicenseSafe`）不受影响。

## 快速开始

```powershell
# 方式一：直接用预编译程序
.\tools\ListaryActivate.exe

# 方式二：从源码构建（Windows + .NET Framework 4.8 自带 csc，零依赖）
powershell -ExecutionPolicy Bypass -File build.ps1
.\tools\test_tool.exe   # 自检（期望 ALL PASS）
```

配置文件位置：`%APPDATA%\Listary\UserProfile\Settings\Preferences.json`  
（写入前自动备份为 `.bak`；仅更新三键，其余搜索动作与历史设置原样保留）。

## 目录结构

```
listary-keygen/
├── README.md                    # 中文说明文档（本文件）
├── README_EN.md                 # English documentation
├── src/
│   ├── ListaryActivate.cs       # 一键激活 GUI（生成 + 填写一体化）
│   ├── LicenseAlgo.cs           # 算法核心（H1/H2/H3/Checksum/Generate/Verify/随机邮箱）
│   ├── PrefsWriter.cs           # 配置写入逻辑（备份/解析/写回/校验/重置在线校验计时）
│   └── HostsGuard.cs            # hosts 屏蔽激活服务器（防联网回退，UAC 提权）
├── tools/                       # 预编译 exe（.NET Framework 4.8，零依赖，双击即用）
│   ├── ListaryActivate.exe
│   └── test_tool.exe
├── tests/
│   └── test_tool.cs             # 控制台自检（算法 + 写入流程断言，含 --gen/--debug 模式）
├── docs/
│   ├── algorithm.md             # CheckLicense 算法原理（常量/哈希/校验串/弱点分析）
│   └── reverse-engineering.md   # 逆向方法论（保护机制/动态解壳/还原步骤）
├── web/                         # 官网与在线算法计算器前端源码 (React + TailwindCSS)
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