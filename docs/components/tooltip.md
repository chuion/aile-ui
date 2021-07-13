# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

:::tip 简介
`aile-ui/tooltip` 是一款 **Tooltip** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElTooltip` 属性的基础上新增 `config` 属性，增强 Tooltip 的功能。
:::

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用`content`属性来决定`hover`时的提示信息。由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

```html
<div class="demo-tooltip">
  <div class="box">
    <div class="top">
      <aile-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
        <el-button>上左</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
        <el-button>上边</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
        <el-button>上右</el-button>
      </aile-tooltip>
    </div>
    <div class="left">
      <aile-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
        <el-button>左上</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
        <el-button>左边</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
        <el-button>左下</el-button>
      </aile-tooltip>
    </div>
  
    <div class="right">
      <aile-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
        <el-button>右上</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
        <el-button>右边</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
        <el-button>右下</el-button>
      </aile-tooltip>
    </div>
    <div class="bottom">
      <aile-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
        <el-button>下左</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
        <el-button>下边</el-button>
      </aile-tooltip>
      <aile-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
        <el-button>下右</el-button>
      </aile-tooltip>
    </div>
  </div>
</div>

<style>
  .box {
    width: 400px;

    .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 60px;
    }

    .right {
      float: right;
      width: 60px;
    }

    .bottom {
      clear: both;
      text-align: center;
    }

    .item {
      margin: 4px;
    }

    .left .aile-tooltip__popper,
    .right .aile-tooltip__popper {
      padding: 8px 10px;
    }
  }
</style>
```
:::

## 主题

Tooltip 组件提供了两个不同的主题：`dark`和`light`。**AileUI开放了主题定制功能！**


:::demo 通过设置`effect`属性来改变主题，默认为`dark`。
```html
<aile-tooltip content="Top center" placement="top">
  <el-button>Dark</el-button>
</aile-tooltip>
<aile-tooltip content="Bottom center" placement="bottom" effect="light">
  <el-button>Light</el-button>
</aile-tooltip>
<aile-tooltip content="Hello Kitty" effect="kitty">
  <el-button>Kitty</el-button>
</aile-tooltip>
```
:::

### 注册主题
```js
// main.js

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/libs/theme-chalk/index.css';
Vue.use(ElementUI);

// 全量引入
import AileUI from 'aile-ui';
Vue.use(AileUI,{
  tooltip: {
    attrs: {
      placement: 'top', 
      openDelay: 200
    },
    themes: [
      {
        name: 'kitty',
        style: {
          padding: '10px',
          background: '#DF0E60',
          borderColor: '#000',
          color: '#FFF',
          fontSize: '14px',
          fontWeight: 'bolder'
        }
      }
    ]
  }
})
```

## 更多 Content

展示多行文本或者是设置文本内容的格式

:::demo 用具名 slot 分发`content`，替代`tooltip`中的`content`属性。
```html
<aile-tooltip placement="top">
  <div slot="content">多行信息<br/>第二行信息</div>
  <el-button>Top center</el-button>
</aile-tooltip>
```
:::

## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`fade-in-linear`。
如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。

事实上，这是基于 [Vue-popper](https://github.com/element-component/vue-popper) 的扩展，你可以自定义任意 Vue-popper 中允许定义的字段。
当然 Tooltip 组件实际上十分强大，文末的API文档会做一一说明。

:::demo
```html
<template>
  <aile-tooltip :disabled="disabled" content="点击关闭 tooltip 功能" placement="bottom" effect="light">
    <el-button @click="disabled = !disabled">点击{{disabled ? '开启' : '关闭'}} tooltip 功能</el-button>
  </aile-tooltip>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false
      };
    }
  };
</script>
```
:::

:::tip
tooltip 内不支持 `router-link` 组件，请使用 `vm.$router.push` 代替。

tooltip 内不支持 disabled form 元素，参考[MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter)，请在 disabled form 元素外层添加一层包裹元素。
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileTooltip` 配置如下属性：

|    参数    | 数据类型 | 默认值 | 可选值 |                      说明                       |
| :--------: | :------: | :----: | :----: | :---------------------------------------------: |
| **themes** |  Array   |   -    |   —    | 预设主题，数组由[主题对象](#theme-主题配置)构成 |
| **attrs**  |  Object  |   -    |   —    |    全局属性配置，支持 `ElTooltip` 的所有属性    |

## Theme 主题对象配置

|    参数    |            数据类型            |  默认值   | 可选值 |                               说明                                |
| :--------: | :----------------------------: | :-------: | :----: | :---------------------------------------------------------------: |
|    name    |             string             | undefined |   —    |                    主题名称，通过`effect`调用                     |
| bodyStyle  |             object             | undefined |   —    | 主题样式，将作为行内样式绑定（支持所有的CSS属性，使用小驼峰命名） |
| arrowStyle | {backgroundColor, borderColor} | undefined |   —    |                     箭头样式，只支持设置颜色                      |

## Attributes/Props 属性

**支持 `ElementUI` 中 [Tooltip](https://element.eleme.io/#/zh-CN/component/tooltip) 的所有属性：`effect` / `content` / `placement` / `model-value / v-model` / `disabled` / `offset` / `transition` 等**