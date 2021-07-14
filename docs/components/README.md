# 简介

<p align="center">
  <img src="/aile-ui/logo.png" width="400">
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

## 特色

`AileUI` 是一个基于 [Vue 2](https://cn.vuejs.org) 和 [Element UI](https://element.eleme.io) 进行二次开发的UI库，包含以下常用组件：

- [Autocomplete 带输入建议的输入框](/aile-ui/components/autocomplete)
- [Avatar 头像](/aile-ui/components/avatar)
- [Card 卡片容器](/aile-ui/components/card)
- [Dialog 对话框](/aile-ui/components/dialog)
- [Form 表单](/aile-ui/components/form)
- [Input 输入框](/aile-ui/components/input)
- [Link 链接](/aile-ui/components/link)
- [Select 下拉选择器](/aile-ui/components/select)
- [Table 表格](/aile-ui/components/table)
- [Tooltip 提示框](/aile-ui/components/tooltip)

每种组件均在原有 `ElementUI` 的基础上进行了功能增强，例如 `Form` 和 `Table` 组件实现了配置化开发，可通过书写JSX语法传入 `column` 属性完成配置，而 `Select` 和 `Autocomplete` 组件则实现了无限滚动加载的功能，更多功能可点击上方列表阅读相应 `README.md` 文档

## 安装

通过 `npm` 或者 `yarn` 安装项目

```bash
npm i aile-ui element-ui

# 或者
yarn add aile-ui element-ui
```

## 快速开始

引用组件，根据需要可全局引入或者局部引入
注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入 `ElementUI` 组件后方可正常使用

`main.js` 全局引入

```js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 方式1：引入全部组件包并设置参数，key的名称是组件类别
import AileUI from 'aile-ui'
Vue.use(AileUI, {
  autocomplete: {
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
