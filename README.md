# 我的观赛手札

一个以北京时间整理世界杯与 CS2 科隆 Major 赛程的静态网页。

## 功能

- 按日期查看比赛时间、队伍、比分与比赛状态
- 世界杯小组积分榜与 CS2 瑞士轮实时态势
- 队徽、国旗与当前排名信息
- 只看未来、深夜场、正常时间和收藏筛选
- 根据个人偏好标记值得关注的比赛
- 世界杯与 CS2 赛事新闻滚播

## 本地预览

可以点击仓库右上角的 **Use this template**，把项目完整复制到自己的 GitHub 账号；也可以通过 **Code > Download ZIP** 下载全部文件。

使用 Git 克隆：

```powershell
git clone https://github.com/crafy-ai/my-match-notebook.git
cd my-match-notebook
```

在项目目录运行：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

随后访问 `http://127.0.0.1:4173/`。
或者直接本地保存后双击index.html也可以直接本地使用。
这是一个纯静态项目，不需要安装 npm 依赖，直接保留文件目录即可运行。

## 部署

推送到 GitHub 默认分支后，`部署 GitHub Pages` 工作流会自动发布网站。
