<p align="center">
  <img src="./docs/assets/aile-ui_logo.png">
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

## Features

`AileUI` 是一个基于 `vue 2.x` 和 `element-ui 2.x` 进行二次开发的UI库，包含以下常用组件：

- [Input 输入框](./lib/input/README.md)
- [Autocomplete 带输入建议的输入框](./lib/autocomplete/README.md)
- [Avatar 头像](./lib/avatar/README.md)
- [Dialog 对话框](./lib/dialog/README.md)
- [Form 表单](./lib/form/README.md)
- [Table 表格](./lib/table/README.md)
- [Link 链接](./lib/link/README.md)
- [Select 下拉选择器](./lib/select/README.md)

每种组件均在原有 `ElementUI` 的基础上进行了功能增强，例如 `Form` 和 `Table` 组件实现了配置化开发，可通过书写JSX语法传入 `column` 属性完成配置，而 `Select` 和 `Autocomplete` 组件则实现了无限滚动加载的功能，更多功能可点击上方列表阅读相应 `README.md` 文档

## Install

通过 `npm` 或者 `yarn` 安装项目

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入ElementUI组件后方可正常使用

```bash
npm i element-ui aile-ui

# 或者
yarn add element-ui aile-ui
```

## Quick Start

引用组件，根据需要可全局引入或者局部引入

`main.js` 全局引入

```js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 方式1：引入全部组件包并设置参数，key的名称是组件类别（首字母大写）
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

