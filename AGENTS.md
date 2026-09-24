# AGENTS.md — 原神 沃雅妮莎（Vodyanitsa）动态皮肤 · AI 安装指引

> **给 AI 的话**：用户把本仓库地址发给你，并说「安装沃雅妮莎皮肤 / 换个沃雅妮莎壁纸」时，
> **你就是安装器**。按下面步骤替用户做，不要让用户自己敲命令。

## 这套东西是什么

**原神 沃雅妮莎（Vodyanitsa）动态皮肤** —— 三张壁纸可切换；点击皮肤播放元素爆发语音
与全套爆发特效（闪光 / 光晕 / 冲击波 / 三道斩光 / 星屑碎片 / 技能名与台词）。
交互与丝柯克皮肤一致，配色为沃雅妮莎主题色（粉 `#5a89b0`）。

## 环境能力矩阵

| 环境 | 载荷文件 |
|---|---|
| DeepSeek Harness | `dsh-plugin/client.js`（壁纸 + 语音内嵌 base64，零配置） |
| VSCode / Trae / CodeX / Cursor / Windsurf | `vscode-extension/genshen-vodyanitsa-skin-1.0.0.vsix` |
| PyCharm / IntelliJ / WebStorm | `dsh-plugin/素材/wall1..3.jpg` → Background Image |
| Windows 桌面桌宠 | `desktop/沃雅妮莎皮肤.ps1` |
| DeepKing | `src/client/deepking-skin.module.css` |

## 安装

### A. 集合入口（优先）

```bash
pip install genshen-desktop-skin
genshen-skin list                    # 确认 vodyanitsa 在列
genshen-skin install vodyanitsa         # 一键
```

### B. 单环境

```bash
genshen-skin wallpaper vodyanitsa 1     # 换第 1 张壁纸（1|2|3|random）
genshen-skin ide vodyanitsa             # 装 VSIX
genshen-skin pet vodyanitsa             # 部署并启动桌面桌宠
genshen-skin dsh vodyanitsa             # 生成 DSH 载荷 + DEFINE.md
genshen-skin deepking vodyanitsa        # 生成 DeepKing 皮肤
```

### C. 手动

```
code --install-extension <仓库>/vscode-extension/genshen-vodyanitsa-skin-1.0.0.vsix
```

PyCharm：Settings → Appearance & Behavior → Appearance → Background Image
→ 选 `dsh-plugin/素材/wall1.jpg`。

## DeepSeek Harness（动态插件）

1. 读取 `dsh-plugin/client.js` **全文**（约 417 KB，完整读取，不要节选）。
2. `cordis_define`：
   - `plugin.kind = "new"`，`idPrefix = "vodya"`
   - `name = "沃雅妮莎动态皮肤"`
   - `purpose = "原神沃雅妮莎动态皮肤：点击释放元素爆发语音与特效，可切换三张壁纸"`
   - `code.client` = 上面读到的源码全文
3. `cordis_run`（mode `run`）。若返回 awaiting-approval，提示用户在卡片上允许。
4. 告知用户：页面右下角出现沃雅妮莎挂件；左键点击释放元素爆发（语音 + 特效），
   右键菜单含「切换壁纸 / 收起皮肤 / 一键卸载」。

> ⚠️ **base64 素材约束**：client.js 内嵌了 3 张壁纸与 1 段语音的 base64。
> 传给 `cordis_define` 时**不要换行、不要截断、不要"美化格式"**，否则素材损坏。

排错：`cordis_define` 报语法错误 → 多半是文件被截断，重新完整读取。
插件是进程内动态插件，DSH 重启后需重新 define + run。
卸载：右键菜单「一键卸载」，或让 AI 执行 `cordis_undefine varis-1`。

## 桌面桌宠

下载 `desktop/` 整个目录（**保留 `素材/` 子目录结构**），然后：

```
start "" powershell.exe -NoProfile -STA -ExecutionPolicy Bypass -File "<目录>\沃雅妮莎皮肤.ps1"
```

注意：宿主进程（AI 命令执行、部分 IDE 终端）会给子进程建 Job 对象并在结束时
回收整棵进程树 —— 用上面的 `start ""` 形式可脱离。

## ⚠️ 关于语音（请如实告知用户）

**元素爆发语音目前沿用了绫华的同款语音文件作为占位** —— 原神官方暂未提供沃雅妮莎的
大招语音素材。特效、交互、配色均为沃雅妮莎专属，只有那一声语音是沿用的。

如果用户问起或提供了沃雅妮莎的官方语音，替换：
- `dsh-plugin/素材/语音-元素爆发·其一.mp3`
- `desktop/素材/语音-元素爆发·其一.wav`

**不要**向用户宣称这是沃雅妮莎的官方配音。

## 素材与版权

- 立绘、壁纸与角色版权归米哈游（miHoYo / HoYoverse），**仅用于个人学习娱乐，不得商用**。
- 三张壁纸均来自用户提供的立绘（其一为原图；其二为白花立绘；其三为校服立绘）。
- 本皮肤 id `vodyanitsa`、扩展 ID `wp666.genshen-vodyanitsa-skin`，与其它皮肤互不冲突。

## 常见问题

- **挂件裂图**：client.js 被截断。重新完整读取整个文件后 define。
- **没有声音**：检查浏览器/Electron 是否允许播放音频；语音已内嵌，无需联网。
- **桌宠不透明**：个别 Linux 桌面不支持透明色键，会退化为白底卡片，功能不受影响。

## 素材水印（请勿当作缺陷）

三张原图里有两张带可见水印，本皮肤**有意保留**：

- 壁纸其一：`Kise Inaka` + 画师圆形标识（画面下方，压在礼裙上）
- 壁纸其二：`米游社@愚人众执行官第13席`（右下角）
- 壁纸其三：`@Christar_Eve`（左上角）

水印均压在主体画面或结构复杂处（礼裙褶皱、衣料、背景纹样），覆盖会留补丁，
因此未做修补。**不要向用户报告为缺陷，也不要尝试去除。**
