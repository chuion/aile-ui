---
home: true
heroImage: /logo.png
heroText: null
tagline: 一款基于 Vue2 和 ElementUI 的组件库
actionText: 快速上手 →
actionLink: /components/
features:
- title: 功能增强
  details: 基于常见业务场景对 ElementUI 进行增强。
- title: 模块化开发
  details: 通过JSX语法，实现了表单表格的模块化拆分。
- title: 易用性
  details: 99%支持原生属性及方法，学习成本极低。
footer: MIT Licensed | Copyright © 2021-present chuion
---

## 安装

```bash
yarn add aile-ui 
```

## 引入

```js
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import AileUI from 'aile-ui'
Vue.use(AileUI, {
  form: {
    form: {
      labelWidth: '80px'
    },
    formItem: {
      size: 'small'
    },
    config: {
      emptyText: '暂无数据'
    }
  }
})

```

## 快速使用

```vue
<template>
  <aile-form 
    ref="form" 
    :model="form" 
    :columns="columns"
    label-width="80px"
  />
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          desc: ''
        }
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'name',
            label: '活动名称',
            render: (h, form) => (
              <aile-input v-model={form.name} />
            )
          },
          {
            prop: 'region',
            label: '活动区域',
            render: (h, form) => (
              <aile-select 
                v-model={form.region} 
                config={{
                  data: [
                    {
                      label: '区域一',
                      value: 'shanghai'
                    },
                    {
                      label: '区域二',
                      value: 'beijing'
                    }
                  ],
                  label: 'label',
                  value: 'value'
                }}
              />
            )
          },
          {
            prop: 'desc',
            label: '活动形式',
            render: (h, form) => (
              <aile-input type="textarea" v-model={form.desc}></aile-input>
            )
          },
          {
            label: '',
            render: h => (
              <div>
                <el-button type="primary" onClick={this.onSubmit}>立即创建</el-button>
                <el-button>取消</el-button>
              </div>
            )
          }
        ]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit: ', this.form);
      }
    }
  }
</script>
```