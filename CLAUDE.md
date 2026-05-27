# 小工具站

## 项目定位

东方夜间仪式感数字空间——不是工具 UI，是安静的东方氛围。

## 项目结构

```
tool-station/
  index.html         — 首页
  theme/             — 共享主题（所有页面引入）
    theme.css          色彩变量、按钮、卡片、vignette、呼吸光晕
    particles.js       canvas 香灰粒子系统
  qiugian/           — 求签（主题参考实现——最完整的主题集成范例）
  yaoshaizi/         — 摇骰子
  xuansha/           — 选啥
  主题设计.txt        — 完整设计哲学与开发指引
```

新工具放在 `tool-station/` 下独立文件夹，如 `tool-station/new-tool/index.html`。

## 已有工具

| 工具 | 路径 | 状态 |
|------|------|------|
| 求签 | tool-station/qiugian/ | **主题参考实现**——最完整的集成范例 |
| 摇骰子 | tool-station/yaoshaizi/ | 已接入主题 |
| 选啥 | tool-station/xuansha/ | 已接入主题 |

部署在 GitHub Pages（picksha.com），推送 main 分支即上线。

## 主题系统

所有页面共享主题。开发新工具时：

- 阅读 `tool-station/主题设计.txt` 了解完整设计哲学和色彩/按钮/卡片/动效规范
- 引入 `../theme/theme.css`（色彩变量、按钮、卡片、vignette、呼吸光晕、动效）
- 引入 `../theme/particles.js`（canvas 香灰粒子，pause/resume API）
- 工具专属 CSS 只写布局和特有动画，颜色一律用 CSS 变量

## 关键 CSS 变量

--gold / --gold-hover / --gold-border / --gold-glow
--bg-deep / --bg-mid / --bg-warm / --bg-surface
--text-body / --text-secondary / --text-faint
--border-subtle / --border-card
--shadow-card / --shadow-card-hover
--t-hover (0.4s) / --t-breathe (3.5s) / --t-ritual (1s)

## 组件类

theme-btn（主按钮）/ theme-btn-ghost（次要按钮）/ theme-card / theme-panel / theme-title / theme-subtitle / theme-breathing

## 设计铁律

- 不要纯黑背景（必须暖灰+暗红+深棕混合）
- 不要 0.3s 以下的快速动画
- 边界融化在黑暗里——用阴影和亮度区分层级，不用描边
- 不加东西，加空气、光、停顿、呼吸
- 产品核心不是信息，是情绪与停顿感
