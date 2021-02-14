## aile-ui/link

### Intro 简介

`aile-ui/link` 是一款文字链接组件，基于 `vue` 和 `element-ui` 进行的二次封装。
- 支持对常见属性进行全局设置，使用更方便，管理更高效。
- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Link` 文档板块；

### Install 安装

通过 `npm` 或者 `yarn` 安装项目，项目提供全组件安装和按需安装，建议使用全组件安装

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入ElementUI组件后方可正常使用

```bash
npm i element-ui aile-ui

# 或者
yarn add element-ui aile-ui
```

### Options 配置项

#### 全局配置项

配置项内容可在全局引入时设置，或者直接使用 `<aile-link {...options} />` ，需注意：直接使用的优先级高于全局配置
下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|    参数    | 数据类型 | 默认值 |   可选值   |               说明                |
| :--------: | :------: | :----: | :--------: | :-------------------------------: |
| underline  | Boolean  | false  | true/false |           是否有下划线            |
| **config** |  Object  |   -    |     -      | 支持全局设置 AileLink config 属性 |

#### config 配置项

|     参数      | 数据类型 | 默认值 | 可选值 |                                                                              说明                                                                               |
| :-----------: | :------: | :----: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   ellipsis    | Boolean  | false  |   -    |                                                                   是否支持超出部分省略号显示                                                                    |
|   maxWidth    |  String  |  100%  |   -    |                                                                         Link 的最大宽度                                                                         |
| inputMaxWidth |  String  |  100%  |   -    | 自定义 inputInner 的最大宽度，不传则使用默认计算规则:<br>1. 无 icon 属性及 icon 插槽时，默认 100%<br>2. 加入 icon 属性减去 20px<br>3. 加入 icon 插槽再减去 20px |


### Attributes/Props 属性

**支持 `ElementUI` 中 [Link](https://element.eleme.cn/#/zh-CN/component/link) 的所有属性：`type` / `underline` / `disabled` / `href` / `icon` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |


### Slot 下拉框插槽

| name  |      说明       |
| :---: | :-------------: |
|   —   | Option 组件列表 |
| icon  |    后置图标     |

### Quick Start 快速开始

- 引入模块并初始化配置

```ts
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/libs/theme-chalk/index.css'
Vue.use(ElementUI)

// 全量引入
import AileUI from 'aile-ui'
Vue.use(AileUI, {
    Link: {
        underline: false,
        config: { ellipsis: true }
    }
})

// or 按需引入
import AileLink from 'aile-ui/lib/link'
Vue.use(AileLink, {
    underline: false,
    config: { ellipsis: true }
})

```

- 标准使用方式

```ts
/**
 * template使用示例
*/
<aile-link
  :underline="false"
  icon="el-icon-loading"
  disabled
  :config="{
    ellipsis: true,
    maxWidth: '100%',
  }"
>
  这是一段包裹在AileLink中的文字
  <i v-slot='icon' class='el-icon-eleme'>
</aile-link>

/**
 * jsx使用示例
*/
<aile-link
  underline={false}
  icon="el-icon-loading"
  config={{
    ellipsis: true,
    maxWidth: '100%',
  }}
>
  这是一段包裹在AileLink中的文字
  <i v-slot='icon' class='el-icon-eleme'>
</aile-link>

```
