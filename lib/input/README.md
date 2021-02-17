## aile-ui/input

### Intro 简介

`aile-ui/input` 是一款 Input 组件，基于 `vue` 和 `element-ui` 进行的二次封装，可以根据需要配置宽度，是否默认开启清空（clearable）、清除前后空格（trim）
- `aile-ui/input` 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Input` 文档板块
- 支持安装时个性化配置

### Install 安装

通过 `npm` 或者 `yarn` 安装项目

```bash
npm i aile-ui

# 或者
yarn add aile-ui
```
### Options 配置项

#### 全局配置项

配置项内容可在全局引入时设置，或者直接使用 `<aile-input {...options} />` ，需注意：直接使用的优先级高于全局配置

下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|    参数    | 数据类型 | 默认值 |   可选值   |          说明           |
| :--------: | :------: | :----: | :--------: | :---------------------: |
| clearable  | Boolean  | false  | true/false |       是否可清空        |
| **config** |  Object  |   {}   |     —      | 特殊配置，如 trim/width |

#### config 配置项

| 参数  | 数据类型 | 默认值 |   可选值   |         说明          |
| :---: | :------: | :----: | :--------: | :-------------------: |
| width |  string  |   -    |     -      | 输入框宽度（如 100%） |
| trim  | boolean  | false  | true/false | 是否去除文本前后空格  |

### AileInput Attributes 属性

**支持 `ElementUI` 中 [Input](https://element.eleme.cn/#/zh-CN/component/input) 的所有属性：`type` / `value/v-model` / `maxlength` / `minlength` / `show-word-limit` / `placeholder` / `clearable` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |

### Slot 插槽

**支持 `ElementUI` 中 [Input](https://element.eleme.cn/#/zh-CN/component/input) 的所有插槽**

### Events 事件

**支持 `ElementUI` 中 [Input](https://element.eleme.cn/#/zh-CN/component/input) 的所有自定义事件**

### Quick Start 快速开始

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入ElementUI组件后方可正常使用

- 引入模块并初始化配置

```ts
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/libs/theme-chalk/index.css'
Vue.use(ElementUI)

// 全量引入
import AileUI from 'aile-ui'
Vue.use(AileUI, {
    Input: {
        clearable: true,
        config: {
          trim: true,
          width: '100%'
        }
    }
})

// or 按需引入
import AileInput from 'aile-ui/lib/input'
Vue.use(AileInput, {
    clearable: true,
    config: {
      trim: true,
      width: '100%'
    }
})

```

- 标准使用方式

```ts
/**
 * template使用示例
*/
<aile-input
  v-model="value"
  clearable
  :config="{
    width: '100%',
    trim: true
  }"
/>

/**
 * or JSX
 */
<aile-input
  v-model={value}
  clearable
  config={{
    width: '100%',
    trim: true
  }}
/>
```
