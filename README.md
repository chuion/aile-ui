<p align="center">
  <img src="https://github.com/chuion/aile-ui/blob/main/docs/assets/logo_img_sc.jpg" style="background-color: #fff;border-radius: 1rem;">
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/aile-ui">
    <img src="https://img.shields.io/npm/v/aile-ui.svg">
  </a>
  <a href="https://npmcharts.com/compare/aile-ui?minimal=true">
    <img src="http://img.shields.io/npm/dm/aile-ui.svg">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

### Features

`AileUI` 是一组基于 `vue 2.x` 和 `element-ui 2.x` 进行二次开发的UI库，包含以下常用组件：

- [Input 输入框](https://github.com/chuion/aile-ui/blob/main/input)
- [Autocomplete 带输入建议的输入框](https://github.com/chuion/aile-ui/blob/main/autocomplete)
- [Avatar 头像](https://github.com/chuion/aile-ui/blob/main/avatar)
- [Dialog 对话框](https://github.com/chuion/aile-ui/blob/main/dialog)
- [Form 表单](https://github.com/chuion/aile-ui/blob/main/form)
- [Table 表格](https://github.com/chuion/aile-ui/blob/main/table)
- [Link 链接](https://github.com/chuion/aile-ui/blob/main/link)
- [Select 下拉选择器](https://github.com/chuion/aile-ui/blob/main/select)

每种组件均在原有ElementUI的基础上进行了功能增强，例如 `Form` 和 `Table` 组件实现了配置化开发，可通过书写JSX语法传入 `column` 属性完成配置，而 `Select` 和 `Autocomplete` 组件则实现了无限滚动加载的功能，更多功能可点击上方列表阅读相应 `README.md` 文档

### Install

通过 `npm` 或者 `yarn` 安装项目，项目提供全组件安装和按需安装，建议使用全组件安装

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入ElementUI组件后方可正常使用

```bash
npm i element-ui aile-ui

# 或者
yarn add element-ui aile-ui
```

### Quick Start

引用组件，根据需要可全局引入或者局部引入

`main.js` 全局引入

```js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 方式1：引入全部组件包并设置参数
import AileUI from 'aile-ui'
Vue.use(AileUI, {
  Autocomplete: {
    clearable: true,
    config: {
      trim: true
    }
  }
})

// 方式2：引入单独组件并设置参数
import AileAutocomplete from 'aile-ui/lib/autocomplete'
Vue.use(AileAutocomplete, {
  clearable: true,
  config: {
    trim: true
  }
});
```

`Demo.vue` 局部引入

```js
import AileAutocomplete from 'aile-ui/lib/autocomplete'
export default {
    components: {
        AileAutocomplete
    }
}
```

