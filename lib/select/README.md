## aile-ui/select

### Intro 简介

`aile-ui/select` 是一款下拉框组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，
- 所有的下拉框选项配置均可通过属性传递，使代码更干净。
- 通过 `config` 属性来实现下拉框选项的配置;
- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Select` 文档板块；

### Install 安装

通过 `npm` 或者 `yarn` 安装项目

```bash
npm i aile-ui

# 或者
yarn add aile-ui
```

### Options 配置项

#### 全局配置项

配置项内容可在全局引入时设置，或者直接使用 `<aile-select {...options} />` ，需注意：直接使用的优先级高于全局配置
下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|    参数    | 数据类型 |                   说明                   |
| :--------: | :------: | :--------------------------------------: |
| **attrs**  |  Object  | 全局属性配置，支持 `ElSelect` 的所有属性 |
| **config** |  Object  |    支持全局设置 AileSelect config 属性     |

#### config 配置项

|       参数       |            数据类型            |   默认值   |       可选值        |                                                 说明                                                  |
| :--------------: | :----------------------------: | :--------: | :-----------------: | :---------------------------------------------------------------------------------------------------: |
|       data       | Array[String] / Array[Obuject] |     []     |          -          |                           静态无需请求时的备选列表（与 remoteMethod 互斥）                            |
|     isClear      |            Boolean             |   false    |     true/false      |                                           是否清空选项列表                                            |
|      label       |        String/Function         |     —      |          —          |                             设置 el-option 的 label,不传则使用遍历项本身                              |
|      value       |        String/Function         |     —      |          —          |                             设置 el-option 的 value,不传则使用遍历项本身                              |
|     disabled     |        String/Function         |     —      |          —          |                                 判断是否禁用的字段名，默认为 disabled                                 |
|   showTooltip    |        Boolean/Function        |   false    |          —          |                                   设置el-option是否需要显示tooltip                                    |
| tooltipComponent |             String             |   false    |          —          |     设置tooltip采用的组件名称, 默认采用 AileTooltip，如果是按需加载，则需手动配置为 'el-tooltip'      |
|   remoteMethod   |            Function            |     —      |          —          | 请求 API，传入后组件 remote、filterable 将置 true，remote-method 方法将使用该请求 API（与 data 互斥） |
|     nonEmpty     |            Boolean             |   false    |     true/false      |                                         请求参数是否不得为空                                          |
|    scrollable    |            Boolean             |    true    |     true/false      |                                      是否需要无限滚动加载可选项                                       |
|   onceRequest    |            Boolean             |   false    |     true/false      |                                          只初始请求一次数据                                           |
|    queryField    |             String             |     —      |          —          |                                          请求时的动态字段名                                           |
|    pageField     |             String             | page_index |          —          |                                            分页页码参数名                                             |
|    sizeField     |             String             | page_size  |          —          |                                      分页每页显示条目个数参数名                                       |
|     pageSize     |             Number             |     20     |          —          |                                         分页每页显示条目个数                                          |
|  requestParams   |             Object             |     —      |          —          |                                           请求时的静态参数                                            |
|  respDataField   |             String             |    data    |          -          |                                   设置请求返回结果的数据项字段名称                                    |
|  respTotalField  |             String             |   total    |          -          |                                   设置请求返回结果的总数项字段名称                                    |
|  respFormatter   |            Function            |     —      |          —          |                                  请求成功后的回调函数，用于组装数据                                   |
| showEachLoading  |            Boolean             |   false    |     true/false      |                    所有请求均展示loading效果，默认为false，仅展示初次加载的loading                    |

### Attributes/Props 属性

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有属性：`value / v-model` / `multiple` / `disabled` / `clearable` / `collapse-tags` / `multiple-limit` / `filterable` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |

> 注意： 当使用了默认 slot 的可选项时，config 配置无效，组件与 el-select 一般无二

### Slot 插槽

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有插槽**，此处仅展示新增插槽：

|  name  |        说明         |
| :----: | :-----------------: |
|   —    |   Option 组件列表   |
| empty  |   无选项时的列表    |
| prefix | Select 组件头部内容 |

### Events 事件

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有事件**，此处仅展示新增事件：

| 事件名 |          说明          |            参数            |
| :----: | :--------------------: | :------------------------: |
| select |  选中值发生变化时触发  |       目前的选中对象       |
| inited | 首次远程请求结束时出发 | 首次加载完成的下拉列表数组 |

### Methods 方法

**支持 `ElementUI` 中 [Select](https://element.eleme.io/#/zh-CN/component/select) 的所有方法**

### Quick Start 快速开始

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入ElementUI组件后方可正常使用

- 引入模块并初始化配置

```ts
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/libs/theme-chalk/index.css';
Vue.use(ElementUI);

// 全量引入
import AileUI from 'aile-ui';
Vue.use(AileUI, {
  select: {
    attrs: {
      remote: false,
      filterable: false,
      popperAppendToBody: false,
      defaultFirstOption: true,
    },
    config: {
        pageField: 'page_index',
        sizeField: 'page_size',
    }
  }
})

// or 按需引入
import AileSelect from 'aile-ui/lib/select'
Vue.use(AileSelect, {
  attrs: {
    remote: false,
    filterable: false,
    popperAppendToBody: false,
    defaultFirstOption: true,
  },
  config: {
      pageField: 'page_index',
      sizeField: 'page_size',
  }
})

```

- 标准使用方式

```ts
/**
 * template使用示例
*/
<aile-select
  v-model="form.target_url"
  disabled
  :config="{
    label: 'label',
    value: 'value',
    data: [{ label: '下拉1', value: 'op1' }]
  }"
/>

/**
 * jsx使用示例
*/
<aile-select
  v-model={form.category}
  clearable
  filterable
  config={{
    label: 'label',
    value: 'value',
    data: CategoryPlateOptions
  }}
/>

<aile-select
  v-model={form.source}
  placeholder='输入来源名称搜索'
  multiple
  filterable
  clearable
  config={{
    queryField: 'source',
    scrollable: false,
    remoteMethod: xxxAPI.getSource
  }}
  onInited={options => {
    console.log(options)
  }}
/>
```
