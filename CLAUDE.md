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

## Git 分支管理（严格遵守）

- **dev**：所有开发工作在此分支进行。提交、修改、实验，一律在 dev。
- **main**：仅用于部署。不得直接在 main 上做任何改动。
- **流程**：dev 开发 → 用户预览确认 → 用户许可后 → merge dev 到 main → 推送。
- **禁止**：未经用户明确许可，绝不擅自 merge 到 main 或 push 到远程。

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

## 首页设计模式

首页不是功能列表，是"深夜里的入口空间"。以下模式已在实际页面验证：

### 卡片层次（非均衡）
- 第一张卡比其他略大（padding +4px）、背景更亮（gradient 8%→2% vs 5%→1%），潜意识暗示"入口"
- 卡片间距 32px——空间感来自空，不是填充
- hover：translateY(-2px) + box-shadow 0 10px 30px rgba(255,180,80,.06)——不用 scale

### 空间照明
- 全局光晕不绝对居中（默认 50% 42%），模拟真实灯具的偏移
- 页面级 `.page-glow` div：hover 卡片时光晕跟随移动（transition 1.8s），像灯火被吸引
- 卡片背景用 diagonal gradient（135deg），模拟"暖灯从左上照下来"
- hover 不同卡片触发不同粒子响应：选啥柔、摇骰动、求签静

### 导航箭头
- 默认几乎不可见：opacity 0.08
- hover：opacity 0.38 + translateX(6px) + transition 0.5s
- 不是"提示点击"，是"黑暗里轻轻流动"

### 卡片内容布局
- 图标和文字整体略右移（留左边空气）：icon margin-left 4px，info padding-left 4px
- 不要标准 UI 的紧凑左对齐——呼吸感来自空气

## 图标规范

- 禁止彩色 emoji 作为功能图标
- 统一使用暖金单色 inline SVG：stroke `rgba(200,155,60,.35~.55)`，极简线条
- 目前三个图标：同心圆（选啥）、骰面方点（摇骰）、竖线签条（求签）
- 新工具图标遵循同样规范：单色、线性、克制

## 文字亮度层级（勿整体提亮）

- 标题：82%（不动）
- 卡片描述：58%（不是 42%——太低会"没显示器亮度"）
- 副标题：28%（不是 15%）
- 箭头/辅助：默认 8%，hover 38%
- 原则：关键层级局部提亮 5~8%，不要整页提亮
- 页面本来就该暗——"夜晚亮度"本身就是质感

## 页面响应模式

- 桌面端 hover 卡片时触发全局变化：光晕偏移 + 粒子变速 + 卡片浮起
- 移动端没有 hover，只展示静态空间感
- `window.themeParticles.pause()/resume()` 用于调整氛围
- 所有状态变化用慢过渡（1.5s+），不让用户"看到变化"——只是"感觉到"

## 设计铁律

- 不要纯黑背景（必须暖灰+暗红+深棕混合）
- 不要 0.3s 以下的快速动画
- 边界融化在黑暗里——用阴影和亮度区分层级，不用描边
- 不加东西，加空气、光、停顿、呼吸
- 产品核心不是信息，是情绪与停顿感
- 页面不绝对居中——真实空间的光和重心有偏移
- 卡片不等大——入口有主次，不是等权按钮组
