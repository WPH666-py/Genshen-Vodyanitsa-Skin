# 🌸 原神 沃雅妮莎（Vodyanitsa）动态皮肤

**Genshen Desktop Skin 家族**成员。三张壁纸可切换，点击皮肤播放元素爆发语音
与**大招特效**（形制取自绫华的爆发动画：闪光 → 光晕 → 冲击波 → 三道斩光 →
星屑与碎片 → 技能名与台词字幕），配色换成沃雅妮莎的主题色。

![沃雅妮莎](dsh-plugin/素材/wall1.jpg)

## ✨ 交互（对标丝柯克皮肤）

| 操作 | 效果 |
|---|---|
| **左键点击皮肤** | 释放元素爆发：中文语音「——水波为证。」+ 全套爆发特效 |
| **拖动** | 移动挂件到任意位置 |
| **右键皮肤** | 菜单：释放元素爆发 / 切换壁纸 / 收起皮肤 / 一键卸载（二次确认） |
| **点 ×** | 收起为胶囊，点胶囊展开 |

## 📦 环境支持

| 目标环境 | 载荷 |
|---|---|
| **DeepSeek Harness** | `dsh-plugin/client.js`（3 张壁纸 + 语音已内嵌 base64，零配置） |
| **VSCode / Trae / CodeX / Cursor / Windsurf** | `vscode-extension/genshen-vodyanitsa-skin-1.0.0.vsix` |
| **PyCharm / IntelliJ / WebStorm** | `dsh-plugin/素材/wall1..3.jpg`（导出后设 Background Image） |
| **Windows 桌面桌宠** | `desktop/沃雅妮莎皮肤.ps1`（透明置顶，点击放大招） |
| **DeepKing** | `src/client/deepking-skin.module.css` |
| **claude-code / kimi-code / CodeX CLI** | 桌面桌宠可覆盖所有窗口 |

## 🚀 安装

```bash
# 1. 集合入口（推荐）
pip install genshen-desktop-skin
genshen-skin install vodyanitsa          # 一键（按本机环境自动选择）
genshen-skin wallpaper vodyanitsa 1      # 只换壁纸（1|2|3|random）
genshen-skin pet vodyanitsa              # 桌面桌宠
genshen-skin ide vodyanitsa              # 装 VSIX 扩展
genshen-skin dsh vodyanitsa              # DSH 动态插件载荷
```

```bash
# 2. 手动克隆
git clone https://github.com/WPH666-py/Genshen-Vodyanitsa-Skin.git
code --install-extension Genshen-Vodyanitsa-Skin/vscode-extension/genshen-vodyanitsa-skin-1.0.0.vsix
```

**DSH 用法**：把 `dsh-plugin/client.js` 全文交给 AI，让它 `cordis_define`
（`code.client` = 全文，`idPrefix = "vodya"`）再 `cordis_run` 即可。

## 🎨 配色

主题色 **`#5a89b0`**（沃雅妮莎的青碧湖蓝），搭配湖蓝与珍珠水光。
亮色为霜白晨光，暗色为深青夜色 `#0e1c24`。

## 📁 目录

```
skin.json                            皮肤名 / 主题色 / 标语（集合目录读这个）
src/client/deepking-skin.module.css  DeepKing 配色变量
dsh-plugin/
  client.js                          零配置版（壁纸 + 语音内嵌 base64）
  client-standalone.js               同上（别名，兼容两种约定）
  host.js                            可选：全画质原图路由
  素材/                               立绘 + 3 张壁纸（原图 + web 版）+ 语音
desktop/                             桌面桌宠脚本与素材
vscode-extension/                    VSIX 扩展
```

## ⚠️ 需要说明的一点

**元素爆发语音目前用的是绫华的同款语音文件作为占位**（原神官方暂未提供沃雅妮莎的
大招语音素材，我也无法凭空生成她的配音）。特效、交互、配色全部是沃雅妮莎专属，
**只有那一声语音是从绫华那套沿用的**。

如果你手上有沃雅妮莎的官方大招语音（mp3 / wav / ogg 均可），替换这两处即可：
- `dsh-plugin/素材/语音-元素爆发·其一.mp3`
- `desktop/素材/语音-元素爆发·其一.wav`

## ⚠️ 素材水印说明

三张原图里有两张带可见水印，本皮肤**原样保留**（未做修补）：

| 壁纸 | 水印 | 位置 |
|---|---|---|
| 其二（特写） | `hiro`、`thank u~♡`，右上角另有一张参考小图 | 画面中部与右上角 |
| 其三（校服） | `@Christar_Eve` | 左上角 |

这些水印压在发丝、衣料等结构复杂的区域上，用底色覆盖会留下明显补丁，
因此**没有做修补**，保持素材原样。

## 🙏 素材版权

立绘、壁纸与角色版权归米哈游（miHoYo / HoYoverse），**仅用于个人学习娱乐，不得商用**。
