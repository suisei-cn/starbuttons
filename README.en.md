# starbuttons

One or more vocal buttons for Suisei.

**[中文](https://suisei.moe/?lang=zh)** | **[English](https://suisei.moe/?lang=en)** | **[日本語](https://suisei.moe/?lang=ja)**

---

README：**English** | [日本語](https://github.com/suisei-cn/starbuttons/blob/master/README.ja.md) | [中文](https://github.com/suisei-cn/starbuttons/blob/master/README.md)

## Project Structure

### Audio data

* [`public/sounds.json`](https://github.com/suisei-cn/starbuttons/blob/master/public/sounds.json) - Audio information
* [`public/assets`](https://github.com/suisei-cn/starbuttons/tree/master/public/assets) - Audio files

Audio contributor only need to modify the files above and make a pull request.

### Page components
* [`src/components`](https://github.com/suisei-cn/starbuttons/tree/master/src/components) - Varied types of buttons
* [`src/App.vue`](https://github.com/suisei-cn/starbuttons/blob/master/src/App.vue) - Main page & settings
* [`src/lang`](https://github.com/suisei-cn/starbuttons/tree/master/src/lang) - Interface text translation
* [`src/style/style.scss`](https://github.com/suisei-cn/starbuttons/blob/master/src/style/style.scss) - Common button style

## Local Deployment for Development
``` sh
# You will need yarn.
yarn install
yarn serve # Development preview with hot reloading
```
