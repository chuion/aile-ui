## aile-ui/card

### Intro 简介

`aile-ui/card` 是一款 Card 容器组件，基于 `vue` 和 `element-ui` 进行的二次封装。

- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件。
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

配置项内容可在全局引入时设置，或者直接使用 `<aile-card {...options} />` ，需注意：直接使用的优先级高于全局配置。
下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|  参数  | 数据类型 | 默认值 |         可选值         |       说明       |
| :----: | :------: | :----: | :--------------------: | :--------------: |
| shadow |  string  | hover  | hover / always / never | 设置阴影显示时机 |

### Attributes/Props 属性

|     参数     |   数据类型   | 默认值 |                            说明                            |
| :----------: | :----------: | :----: | :--------------------------------------------------------: |
|    title     | string/array |   -    |                        设置卡片标题                        |
|   lazyLoad   |   boolean    | false  | 当 title 为数组时，lazyLoad 如果为 true，则不设置活跃标题  |
|    width     |    string    |  100%  |                            宽度                            |
|    height    |    string    |  100%  |                            高度                            |
|  minHeight   |    string    |  auto  |                          最小高度                          |
|  showEmpty   |   boolean    | false  | showEmpty 为 true 时，显示`<slot name="empty"></slot>`内容 |
|   loading    |   boolean    | false  |     loading 为 true 时，卡片正文部分 v-loading="true"      |
|    shadow    |    string    | hover  |      设置阴影显示时机，可选值：hover / always / never      |
| activeTitle  |    string    |   -    |  当 title 为数组时，设置卡片活跃标题，值改变时会切换标题   |
| headerClass  |    string    |   ''   |                      卡片 HEADER 类名                      |
| headerStyle  |    Object    |   {}   |                    卡片 HEADER 行内样式                    |
| contentClass |    string    |   ''   |                     卡片 CONTENT 类名                      |
| contentStyle |    string    |   ''   |                   卡片 CONTENT 行内样式                    |

### Slot 插槽

|  name  |                说明                 |
| :----: | :---------------------------------: |
|   —    |            卡片正文内容             |
| title  |           卡片左侧主标题            |
| header |           卡片右侧副标题            |
| empty  | 卡片 showEmpty 为 true 时展示的内容 |

### Events 事件

|    事件名    |             说明             | 参数  |
| :----------: | :--------------------------: | :---: |
| change-title | 当前活跃的标签发生变化时触发 | title |

### Quick Start 快速开始

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入 ElementUI 组件后方可正常使用

- 引入模块并初始化配置

```ts
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/libs/theme-chalk/index.css';
Vue.use(ElementUI);

// 全量引入
import AileUI from 'aile-ui';
Vue.use(AileUI, {
  Card: {
    shadow: 'always'
  },
});

// or 按需引入
import AileCard from 'aile-ui/lib/avatar';
Vue.use(AileCard, {
    shadow: 'always'
  },
});
```

- 标准使用方式

```ts
/**
 * template使用示例
*/
<aile-card
  title="卡片标题"
  width="300px"
  :loading="loading"
  :content-style="{ padding: 0 }"
/>

/**
 * or JSX
 */
<aile-autocomplete
  title={[ 'Tab1', 'Tab2' ]}
  loading={ this.loading }
  contentStyle={{ padding: 0 }}
  @change-title="handleChangeTitle"
  lazyLoad
  active-title="Tab2"
/>
```
