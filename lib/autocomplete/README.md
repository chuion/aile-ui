## aile-ui/autocomplete

### Intro 简介

`aile-ui/autocomplete` 是一款带输入建议的 Input 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装。
- 丰富的可配置项，包括宽度，是否默认开启清空（clearable）、清除前后空格（trim）、选项无限滚动等。
- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Input` 文档板块中 `Autocomplete` 部分，上手快。
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

配置项内容可在全局引入时设置，或者直接使用 `<aile-autocomplete {...options} />` ，需注意：直接使用的优先级高于全局配置
下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|  参数  | 数据类型 | 默认值 | 可选值 |                                                说明                                                 |
| :----: | :------: | :----: | :----: | :-------------------------------------------------------------------------------------------------: |
| config |  Object  |   {}   |   —    |                                   [Config 配置项](#config-配置项)                                   |
| attrs  |  Object  |   {}   |   —    | [Autocomplete Props](https://element.eleme.io/#/zh-CN/component/input#autocomplete-attributes) |

#### Config 配置项

|      参数      | 数据类型 |   默认值   |   可选值   |                             说明                             |
| :------------: | :------: | :--------: | :--------: | :----------------------------------------------------------: |
|     remote     | Boolean  |   false    | true/false |                        是否为远程搜索                        |
|      data      |  Array   |     []     |     —      | 静态非远程搜索时的备选列表（当 参数 remote 为 false 时生效） |
|   scrollable   | Boolean  |    true    | true/false | 是否需要无限滚动加载可选项 （当 参数 remote 为 true 时生效） |
|  remoteMethod  | Function |     —      |     —      |                         远程搜索方法                         |
|   queryField   |  String  |     —      |     —      |                       请求时的动态字段                       |
| requestParams  |  Object  |     —      |     —      |                       请求时的静态参数                       |
|    pageSize    |  Number  |     20     |     —      |                     分页每页显示条目个数                     |
|   pageField    |  String  | page_index |     —      |                        分页页码参数名                        |
|   sizeField    |  String  | page_size  |     —      |                  分页每页显示条目个数参数名                  |
| respTotalField |  String  |   total    |     -      |               设置请求返回结果的总数项字段名称               |
| respDataField  |  String  |    data    |     -      |               设置请求返回结果的数据项字段名称               |
| respFormatter  | Function |     —      |     —      |              请求成功后的回调函数，用于组装数据              |
|    lazyTrim    | Boolean  |   false    | true/false |                     是否删除文本前后空格                     |
|     width      |  String  |     -      |     -      |           是否在Input触发change事件前进行trim处理            |

### Attributes/Props 属性

**支持 `ElementUI` 中 [Autocomplete](https://element.eleme.io/#/zh-CN/component/input#autocomplete-attributes) 的所有属性：`placeholder` / `disabled` / `value-key` / `value` / `debounce` / `placement` / `fetch-suggestions` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |

### Slot 插槽

**支持 `ElementUI` 中 [Autocomplete](https://element.eleme.io/#/zh-CN/component/input#autocomplete-slots) 的所有插槽**

### Events 事件

**支持 `ElementUI` 中 [Autocomplete](https://element.eleme.io/#/zh-CN/component/input#autocomplete-events) 的所有自定义事件**

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
  autocomplete: {
    attrs: {
      clearable: true,
    }
    config: {
      lazyTrim: true
    }
  }
})

// or 按需引入
import AileAutocomplete from 'aile-ui/lib/autocomplete'
Vue.use(AileAutocomplete, {
  attrs: {
    clearable: true,
  }
  config: {
    lazyTrim: true
  }
})

```

- 标准使用方式

```ts
/**
 * template使用示例（使用trim + 远程搜索 + 滚动加载）
*/
<aile-autocomplete
  v-model="value"
  clearable
  :config="{
    width: '100%',
    trim: true,
    remote: true,
    scrollable: true,
    pageField: 'page',
    sizeField: 'size',
    queryField: 'name',
    remoteMethod: $api.getUserList,
    respFormatter: list => list.map(item => ({ value: item }))
  }"
/>

/**
 * jsx
 */
<aile-autocomplete
  v-model={value}
  clearable
  config={{
    width: '100px',
    trim: true,
    dataSource: ['建议一','建议二'],
  }}
/>
```

