# Hello VuePress

# fdsf
::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <div class="red-center-text">
      <p>{{ message }}</p>
      <el-input v-model="message" placeholder="Input something..."/>
      <aile-avatar />
      <aile-form :columns="columns" :model="form" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello Vue',
      form: {
        name: 'Lily',
        age: 13
      }
    }
  },
  computed: {
    columns() {
      return [
        {
          prop: 'name',
          label: '姓名',
          render: (h, form) => {
            return <el-tag>{form.name}</el-tag>
          }
        },
        {
          prop: 'age',
          label: '年龄',
          render: (h, form) => {
            return <aile-input v-model={form.age} />
          }
        }
      ]
    }
  }
}
</script>
<style>
.red-center-text { 
  color: #ff7875;
  text-align: center;
}
</style>
```
:::