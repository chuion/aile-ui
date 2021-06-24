## aile-ui/avatar

### Intro 简介

`aile-ui/avatar` 是一款 Avatar 头像组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装。

- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Avatar` 文档，上手快。
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

配置项内容可在全局引入时设置，下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|    参数    | 数据类型 | 默认值 | 可选值 |                                   说明                                   |
| :--------: | :------: | :----: | :----: | :----------------------------------------------------------------------: |
| **config** |  Object  |   -    |   -    |                     [Config 配置项](#config-配置项)                      |
| **attrs**  |  Object  |   -    |   -    | [ElAvatar Props](https://element.eleme.io/#/zh-CN/component/avatar) |


#### config 配置项

|       参数       | 数据类型 |                        默认值                        |               说明               |
| :--------------: | :------: | :--------------------------------------------------: | :------------------------------: |
| labelPlaceholder |  string  |                       Unknown                        |  当图片读取失败时显示的默认标签  |
|  labelFormatter  | function |        name => name.slice(0, 2).toUpperCase()        |          标签格式化函数          |
|    labelStyle    |  object  | { fontSize: '16px';<br> backgroundColor: '#3381D0' } |             标签样式             |
|   srcFormatter   | function |                         ...                          |          src格式化函数           |
|       size       |  string  |                          -                           | avatar尺寸，统一设置width/height |


### Attributes/Props 属性

**支持 `ElementUI` 中 [Avatar](https://element.eleme.io/#/zh-CN/component/Avatar) 的所有属性：`icon` / `size` / `shape` / `src` / `srcSet` / `all` / `fit` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| label  |  string  |   -    |     当图片读取失败时显示的字符     |
|  src   |  string  |   -    |     图像来源，支持网址和base64     |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |

### Slot 插槽

**支持 `ElementUI` 中 [Avatar](https://element.eleme.io/#/zh-CN/component/Avatar) 的所有插槽**

### Events 事件

**支持 `ElementUI` 中 [Avatar](https://element.eleme.io/#/zh-CN/component/Avatar) 的所有自定义事件**

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
  avatar: {
    attrs: {
      fit: 'cover',
    },
    config: {
      labelPlaceholder: '未知姓名',
      labelStyle: {
        fontSize: '20px',
        backgroundColor: 'red'
      },
      labelFormatter: name => name.slice(0, 1).toUpperCase()
    }
  }
})

// or 按需引入
import AileAvatar from 'aile-ui/lib/avatar'
Vue.use(AileAvatar, {
    attrs: {
      fit: 'cover',
    },
    config: {
      labelPlaceholder: '未知姓名',
      labelStyle: {
        fontSize: '20px',
        backgroundColor: 'red'
      },
      labelFormatter: name => name.slice(0, 1).toUpperCase()
    }
})

```

- 标准使用方式

```ts
/**
 * template使用示例
*/
<aile-avatar
  :label="username"
  fit="cover"
  :config="{
    size: 40
    labelPlaceholder: '未知姓名'
  }"
/>

/**
 * or JSX
 */
<aile-autocomplete
  label={this.username}
  fit="cover"
  config={{
    size: 40,
    labelPlaceholder: '未知姓名'
  }}
/>
```
