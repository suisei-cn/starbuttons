# starbuttons

One or more vocal buttons for Suisei.

**[中文](https://suisei.moe/#zh)** | **[English](https://suisei.moe/#en)** | **[日本語](https://suisei.moe/#ja)**

---

README：**中文** | [English](https://github.com/suisei-cn/starbuttons/blob/master/README.en.md) | [日本語](https://github.com/suisei-cn/starbuttons/blob/master/README.ja.md)

## 项目结构

### 音频信息

* [`public/sounds.json`](https://github.com/suisei-cn/starbuttons/blob/master/public/sounds.json) - 音频信息
* [`public/assets`](https://github.com/suisei-cn/starbuttons/tree/master/public/assets) - 音频文件

提交音频的贡献者只需要修改这两处并 PR 即可。

### 页面组件
* [`src/components`](https://github.com/suisei-cn/starbuttons/tree/master/src/components) - 各种不同样式的按钮
* [`src/App.vue`](https://github.com/suisei-cn/starbuttons/blob/master/src/App.vue) - 页面结构、设置按钮及其样式
* [`src/lang`](https://github.com/suisei-cn/starbuttons/tree/master/src/lang) - 界面语言文件
* [`src/style/style.scss`](https://github.com/suisei-cn/starbuttons/blob/master/src/style/style.scss) - 按钮公用样式

## 本地开发部署
``` sh
# 需要安装 yarn。
yarn install
yarn serve #带热重载的开发模式
```
