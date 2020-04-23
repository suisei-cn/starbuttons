# starbuttons

One or more vocal buttons for Suisei.

**[中文](https://suisei.moe/#zh)** | **[English](https://suisei.moe/#en)** | **[日本語](https://suisei.moe/#ja)**

## 概要

### 音声

* [`public/sounds.json`](https://github.com/suisei-cn/starbuttons/blob/master/public/sounds.json) - 音频信息
* [`public/assets`](https://github.com/suisei-cn/starbuttons/tree/master/public/assets) - 音频文件

音声のみの投稿をする人は上記の2つを変更してください。

### 構成
* [`src/components`](https://github.com/suisei-cn/starbuttons/tree/master/src/components) - 各种不同样式的按钮
* [`src/App.vue`](https://github.com/suisei-cn/starbuttons/blob/master/src/App.vue) - 页面结构、设置按钮及其样式
* [`src/lang`](https://github.com/suisei-cn/starbuttons/tree/master/src/lang) - 界面语言文件
* [`src/style/style.scss`](https://github.com/suisei-cn/starbuttons/blob/master/src/style/style.scss) - 按钮公用样式

## ローカルでの利用方法
``` sh
# yarnのインストールが必要です。
yarn install
yarn serve #ホットリロード付の開発モデル
```
