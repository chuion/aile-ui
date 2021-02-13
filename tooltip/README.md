## aile-ui/tooltip

### Intro 简介

`aile-ui/tooltip` 是一款Tooltip组件，基于 `vue` 和 `element-ui` 进行的二次封装
- 可以根据需要配置皮肤、设置最大宽度。
- 通过 `theme.js` 来实现`Tooltip`皮肤的配置;
- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件，无缝对接 `element-ui` 中的 `Tooltip` 文档板块；

### Install 安装

通过 `npm` 或者 `yarn` 安装项目，项目提供全组件安装和按需安装，建议使用全组件安装

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入ElementUI组件后方可正常使用

- 方式1：全组件安装

```bash
npm i aile-ui

# 或者
yarn add aile-ui
```

- 方式2：按需安装

```bash
npm i aile-ui/tooltip
```

### Options 配置项

#### 全局配置项

配置项内容可在全局引入时设置，或者直接使用 `<aile-tooltip {...options} />` ，需注意：直接使用的优先级高于全局配置
下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|    参数    | 数据类型 | 默认值 |                                                  可选值                                                   |                       说明                       |
| :--------: | :------: | :----: | :-------------------------------------------------------------------------------------------------------: | :----------------------------------------------: |
| placement  |  String  | bottom | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |                Tooltip 的出现位置                |
| open-delay |  Number  |   0    |                                                     —                                                     |                延迟出现，单位毫秒                |
|   effect   |  String  |  dark  |                                              dark/light/...                                               | 除默认提供的主题外，其他主题在theme.js中进行配置 |
| **config** |  Object  |   {}   |                                                     —                                                     |               特殊配置，如maxWidth               |

#### config 配置项

|   参数   | 数据类型 |  默认值   | 可选值 |      说明      |
| :------: | :------: | :-------: | :----: | :------------: |
| maxWidth |  string  | undefined |   —    | popper最大宽度 |
|  themes  |  array   | undefined |   —    |    预设主题    |

### theme 主题配置

|  参数  | 数据类型 |  默认值   | 可选值 |             说明             |
| :----: | :------: | :-------: | :----: | :--------------------------: |
|  name  |  string  | undefined |   —    |  主题名称，通过`effect`调用  |
| styles |  object  | undefined |   —    | 主题样式，将作为行内样式绑定 |

> 注意：`styles` 目前仅支持设置 `color` / `background` / `borderColor` / `padding` /`fontSize`;

### Attributes/Props 属性

**支持 `ElementUI` 中 [Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip) 的所有属性：`effect` / `content` / `placement` / `value / v-model` / `disabled` / `offset` / `transition` 等**，此处仅展示额外属性：

|  参数  | 数据类型 | 默认值 |                说明                |
| :----: | :------: | :----: | :--------------------------------: |
| config |  object  |   -    | 配置项，字段同全局config配置项相同 |


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
    Tooltip: {
        placement: 'top', 
        openDelay: 1000, 
        effect: 'custom',
        config: { 
          maxWidth: '400px',
          themes: [
            {
              name: 'custom',
              styles: {
                padding: '5px',
                background: '#eee',
                borderColor: 'red',
                color: 'skyblue',
                fontSize: '14px'
              }
            }
          ]
        }
    }
})

// or 按需引入
import AileTooltip from 'aile-ui/tooltip'
Vue.use(AileTooltip, {
    placement: 'top', 
    openDelay: 1000, 
    effect: 'custom',
    config: { 
      maxWidth: '400px',
      themes: [
        {
          name: 'custom',
          styles: {
            padding: '5px',
            background: '#eee',
            borderColor: 'red',
            color: 'skyblue',
            fontSize: '14px'
          }
        }
      ]
    }
})

```

- 标准使用方式

```ts
/**
 * el-tooltip的皮肤设置格式，如需更多皮肤即按照规则处理数组
 */
tooltipTheme = [
  // effect: 'custom' 采用的样式
  {
    name: 'custom',
    styles: {
      padding: '5px',
      background: '#eee',
      borderColor: 'red',
      color: 'skyblue',
      fontSize: '14px'
    }
  }
];

/**
 * template使用示例
*/
<aile-tooltip
  content="皮肤名为custom，在theme.js中进行配置"
  max-width="100px"
  effect="custom"
>
  <el-button
    type="primary"
    size="medium"
  >
    AileTooltip
  </el-button>
</aile-tooltip>

```
