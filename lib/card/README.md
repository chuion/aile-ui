## aile-ui/card

### Intro 简介

`aile-ui/card` 是一款 Card 容器组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装。

- 采用 `$attrs` 和 `$listeners` 接收参数和监听事件。
- 支持安装时个性化配置

### Install 安装

通过 `npm` 或者 `yarn` 安装项目

```bash
npm i aile-ui

# 或者
yarn add aile-ui
```

### Global Options 全局配置项

配置项内容可在全局引入时设置，下表所列属性可在 `main.js` 中安装组件时进行统一配置：

|    参数    | 数据类型 | 默认值 |              说明               |
| :--------: | :------: | :----: | :-----------------------------: |
| **config** |  Object  |   {}   | [Config 配置项](#Config-配置项) |

### Config 配置项

|    参数     |      数据类型       | 默认值 |         可选值         |         说明          |
| :---------: | :-----------------: | :----: | :--------------------: | :-------------------: |
|   shadow    |       string        | hover  | hover / always / never |   设置阴影显示时机    |
|    width    |       string        |  100%  |           -            |         宽度          |
|   height    |       string        |  100%  |           -            |         高度          |
|  minHeight  |       string        |  auto  |           -            |       最小高度        |
| headerClass | string/array/object |   ''   |           -            |   卡片 HEADER 类名    |
| headerStyle |       object        |   {}   |           -            | 卡片 HEADER 行内样式  |
|  bodyClass  | string/array/object |   ''   |           -            |   卡片 CONTENT 类名   |
|  bodyStyle  |       string        |   ''   |           -            | 卡片 CONTENT 行内样式 |

### Attributes/Props 属性

|    参数     |   数据类型   | 默认值 |                            说明                            |
| :---------: | :----------: | :----: | :--------------------------------------------------------: |
| **config**  |    Object    |   {}   |              [Config 配置项](#Config-配置项)               |
|    title    | string/array |   -    |                        设置卡片标题                        |
|  lazyLoad   |   boolean    | false  | 当 title 为数组时，lazyLoad 如果为 true，则不设置活跃标题  |
|  isEmpty  |   boolean    | false  | isEmpty 为 true 时，显示`<slot name="empty"></slot>`内容 |
|   loading   |   boolean    | false  |     loading 为 true 时，卡片正文部分 v-loading="true"      |
| activeTitle |    string    |   -    |  当 title 为数组时，设置卡片活跃标题，值改变时会切换标题   |

> Tips：Config配置项可通过 Prop 的方式直接传入 AileCard 组件，**优先级高于在config中配置**
> 另外，`headerClass` `headerStyle` `bodyClass` `bodyStyle` 如果采用 Prop 的方式传入，会和 config 中的对应参数进行合并

### Slot 插槽

| name  |                说明                 |
| :---: | :---------------------------------: |
|   —   |            卡片正文内容             |
| title |           卡片左侧主标题            |
|  sub  |           卡片右侧副标题            |
| empty | 卡片 isEmpty 为 true 时展示的内容 |

### Events 事件

| 事件名 |             说明             | 参数  |
| :----: | :--------------------------: | :---: |
| change | 当前活跃的标签发生变化时触发 | title |

### Quick Start 快速开始

注意：由于 `AileUI` 是基于 `ElementUI` 进行的二次开发，因此需全局引入 ElementUI 组件后方可正常使用

- 引入模块并初始化配置

```ts
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/libs/theme-chalk/index.css';
Vue.use(ElementUI);

// 全量引入
import AileUI from 'aile-ui'
Vue.use(AileUI, {
  card: {
    config: {
      headerClass: 'kitty',
      headerStyle: {
        backgroundColor: 'red'
      }
    }
  },
});

// or 按需引入
import AileCard from 'aile-ui/lib/avatar';
Vue.use(AileCard, {
  config: {
    headerClass: 'kitty',
    headerStyle: {
      backgroundColor: 'red'
    }
  }
  },
});
```

- 标准使用方式

```ts
/**
 * template使用示例
*/
<aile-card
  title="Wahaha"
  width="800px"
  :class="{
    'show-class': true,
    'hide-class': false,
  }"
  header-class="biubiu"
  style="background-color: red; border: 1px solid"
  :header-style="{ border: '1px solid blue' }"
>
  <template #sub>
    <span>反转地球</span>
  </template>
  <h1>壁虎在漫步~</h1>
</aile-card>

/**
 * or JSX
 */
<aile-autocomplete
  title={[ 'Tab1', 'Tab2' ]}
  loading={ this.loading }
  bodyStyle={{ padding: 0 }}
  onChange="handleChangeTitle"
  lazyLoad
  active-title="Tab2"
/>
```
