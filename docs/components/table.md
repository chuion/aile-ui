# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

:::tip 简介
`aile-ui/table` 是一款 **Table** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElTable` 属性的基础上新增 `config` 属性，增强 Table 的功能。
:::

## 新功能集锦

:::demo
```html
<template>
  <div class="demo-table" style="height: 800px">
    <aile-table
      :data="tableData"
      :columns="tableColumns"
      :config="{
        merge: ['gender'],
      }"
      :table="{
        stripe: true,
        highlightCurrentRow: true,
      }"
      :table-column="{
        align: 'center',
        headerAlign: 'center',
      }"
      :pagination="{
        layout: 'slot, -> , prev, pager, next, jumper, sizes, total',
        total,
        pageSize,
      }"
      @current-change="handleCurrentChange"
      @page-current-change="handlePageChange"
      @size-change="handleSizeChange"
      v-model:currentPage="currentPage"
    >
      <template #pagination>
        <span>Guess Page Game</span>
      </template>
      <template #empty>
        <span>Guess Page Game</span>
      </template>
    </aile-table>
  </div>
</template>

<script>
const list = []
for (let idx = 0; idx < 70; idx++) {
  list.push({
    name: "aile" + idx,
    age: idx,
    gender: idx % 7 < 3 ? "male" : "female",
    hobby: ["html", "css", "js"],
    isEdit: false,
  })
}
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      customHeader: "年龄",
      cache: {},
      tableData: list.slice(0, this.pageSize)
    }
  },
  computed: {
    total() {
      return list.length;
    },
    tableColumns() {
      return [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "custom_hidden",
          label: "自定义隐藏",
          show: () => false,
        },
        {
          prop: "age",
          formatter: (row, column, value) => {
            if (value || value === 0) {
              return value + "岁";
            }
          },
          renderHeader: (h, scope) => {
            return <el-input v-model={this.customHeader} size="mini" />;
          },
        },
        {
          prop: "gender",
          label: "性别",
          render: (h, scope) => {
            const genderNameMap = { male: "男生", female: "女生" };
            if (scope.row.gender) {
              return (
                <el-tag
                  type={scope.row.gender === "male" ? "danger" : "success"}
                  size="mini"
                >
                  {genderNameMap[scope.row.gender]}
                </el-tag>
              );
            }
          },
        },
        {
          prop: "hobby",
          label: "兴趣",
          render: (h, scope) => {
            if (scope.row.isEdit) {
              const options = [
                {
                  name: "前端",
                  id: "front",
                  children: [
                    {
                      name: "HTML",
                      id: "html",
                    },
                    {
                      name: "JavaScript",
                      id: "js",
                    },
                    {
                      name: "CSS",
                      id: "css",
                    },
                  ],
                },
                {
                  name: "后端",
                  id: "back",
                  children: [
                    {
                      name: "JAVA",
                      id: "java",
                    },
                    {
                      name: "Golang",
                      id: "golang",
                    },
                    {
                      name: "Python",
                      id: "python",
                    },
                  ],
                },
              ];
              const cascaderProps = {
                options,
                props: {
                  checkStrictly: true,
                  label: "name",
                  value: "id",
                  multiple: true,
                  emitPath: false,
                },
                clearable: true,
                filterable: true,
              };
              return (
                <el-cascader
                  {...{ props: cascaderProps }}
                  v-model={scope.row.hobby}
                />
              );
            }

            if (!scope.row.hobby || !scope.row.hobby.length) return;

            const hobbyList = scope.row.hobby.map((item) => (
              <el-tag size="mini" style="margin-right: 5px;">
                {item}
              </el-tag>
            ));
            return <div>{hobbyList}</div>;
          },
        },
        {
          prop: "operate",
          label: "操作",
          align: "center",
          headerAlign: "center",
          render: (h, scope) => {
            const handleEdit = () => {
              this.cache[scope.row.name] = JSON.parse(JSON.stringify(scope.row));
              scope.row.isEdit = true;
            };
            const handleCancel = () => {
              Object.assign(scope.row, this.cache[scope.row.name]);
              scope.row.isEdit = false;
            };
            const handleConfirm = () => {
              setTimeout(() => {
                console.log("修改成功");
                scope.row.isEdit = false;
              });
            };
            if (!scope.row.isEdit) {
              return (
                <el-button type="primary" size="mini" onClick={handleEdit}>
                  编辑
                </el-button>
              );
            }
            return (
              <el-button-group>
                <el-button type="success" size="mini" onClick={handleConfirm}>
                  保存
                </el-button>
                <el-button type="info" size="mini" onClick={handleCancel}>
                  取消
                </el-button>
              </el-button-group>
            );
          },
        },
      ];
    },
  },
  methods: {
    handleCurrentChange(val, old) {
      console.log("row", val, old);
    },
    handlePageChange(val) {
      console.log("page: ", val);
      this.tableData = list.slice((val - 1) * this.pageSize, val * this.pageSize)
    },
    handleSizeChange(val) {
      console.log("size: ", val);
      this.pageSize = val;
      this.currentPage = 1;
    },
  },
};
</script>

```
:::

## 基础表格

基础的表格展示用法。

:::demo 当`el-table`元素中注入`data`对象数组后，在`el-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。
```html
  <template>
    <div class="demo-table">
      <aile-table
        :data="tableData"
        :columns="columns"
      />
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      computed: {
        columns() {
          return [
            {
              prop: 'date',
              label: '日期',
              width: '180'
            },
            {
              prop: 'name',
              label: '姓名',
              width: '180'
            },
            {
              prop: 'address',
              label: '地址'
            }
          ]
        }
      }
    }
  </script>
```
:::

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

:::demo `stripe`属性可以创建带斑马纹的表格。它接受一个`Boolean`，默认为`false`，设置为`true`即为启用。
```html
<template>
  <div class="demo-table">
    <aile-table
      stripe
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
      computed: {
        columns() {
          return [
            {
              prop: 'date',
              label: '日期',
              width: '180'
            },
            {
              prop: 'name',
              label: '姓名',
              width: '180'
            },
            {
              prop: 'address',
              label: '地址'
            }
          ]
        }
      }
  }
</script>
```
:::

## 带边框表格

:::demo 默认情况下，Table 组件是不具有竖直方向的边框的，如果需要，可以使用`border`属性，它接受一个`Boolean`，设置为`true`即可启用。
```html
<template>
  <div class="demo-table">
    <aile-table
      stripe
      border
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '180'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '180'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      }
    }
  }
</script>
```
:::

## 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

:::demo 可以通过指定 Table 组件的 `row-class-name` 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
      :row-class-name="tableRowClassName"
    />
  </div>
</template>

<style>
.demo-table .el-table .warning-row {
  background: oldlace;
}

.demo-table .el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '180'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '180'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      }
    }
  }
</script>
```
:::

## 固定表头

纵向内容过多时，可选择固定表头。

:::demo 只要在`el-table`元素中定义了`height`属性，即可实现固定表头的表格，而不需要额外的代码。
```html
<template>
  <div class="demo-table">
    <aile-table
      height="250"
      border
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '180'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '180'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      }
    }
  }
</script>
```
:::

## 固定列

横向内容过多时，可选择固定列。

:::demo 固定列需要使用`fixed`属性，它接受 Boolean 值或者`left` `right`，表示左边固定还是右边固定。
```html
<template>
  <div class="demo-table">
    <aile-table
      border
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '150'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'province',
            label: '省份',
            width: '120'
          },
          {
            prop: 'city',
            label: '市区',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址',
            width: '300'
          },
          {
            prop: 'zip',
            label: '邮编',
            width: '120'
          },
          {
            prop: 'city',
            label: '市区',
            width: '120'
          },
          {
            label: '操作',
            fixed: 'right',
            width: '100',
            render: (h, scope) => (
              <div>
                <el-button onClick={() => this.handleClick(scope.row)} type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </div>
            )
          }
        ]
      }
    }
  }
</script>
```
:::

## 固定列和表头

横纵内容过多时，可选择固定列和表头。

:::demo 固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
      height="250"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '150'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'province',
            label: '省份',
            width: '120'
          },
          {
            prop: 'city',
            label: '市区',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址',
            width: '300'
          },
          {
            prop: 'zip',
            label: '邮编',
            width: '120'
          },
          {
            prop: 'city',
            label: '市区',
            width: '120'
          }
        ]
      }
    }
  }
</script>
```
:::

## 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

:::demo 通过设置`max-height`属性为 Table 指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
      max-height="250"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '150'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'province',
            label: '省份',
            width: '120'
          },
          {
            prop: 'city',
            label: '市区',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址',
            width: '300'
          },
          {
            prop: 'zip',
            label: '邮编',
            width: '120'
          },
          {
            label: '操作',
            fixed: 'right',
            width: '100',
            render: (h, scope) => (
              <el-button
                onClick={() => {
                  this.deleteRow(scope.$index, this.tableData)
                }}
                type="text"
                size="small">
                移除
              </el-button>
            )
          }
        ]
      }
    }
  }
</script>
```
:::

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo 通过设置column中的children进行表格头嵌套，理论支持无限极嵌套，嵌套也支持自定义表头及列数据。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '150'
          },
          {
            label: '配送信息',
            children: [
              {
                prop: 'name',
                label: '姓名',
                width: '120'
              },
              {
                label: '地址',
                children: [
                  {
                    prop: 'province',
                    label: '省份',
                    width: '120'
                  },
                  {
                    prop: 'city',
                    label: '市区',
                    width: '120'
                  },
                  {
                    prop: 'address',
                    label: '地址',
                    width: '300'
                  },
                  {
                    prop: 'zip',
                    label: '邮编',
                    width: '120'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
</script>
```
:::

## 单选

选择单行数据时使用色块表示。

:::demo Table 组件提供了单选的支持，只需要配置`highlight-current-row`属性即可实现单选。之后由`current-change`事件来管理选中时触发的事件，它会传入`currentRow`，`oldCurrentRow`。如果需要显示索引，可以增加一列`el-table-column`，设置`type`属性为`index`即可显示从 1 开始的索引号。
```html
<template>
  <div class="demo-table" style="height: 250px">
    <aile-table
      ref="singleTable"
      :data="tableData"
      :columns="columns"
      highlight-current-row
      @current-change="handleCurrentChange"
    />
  </div>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
    <el-button @click="setCurrent()">取消选择</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null
      }
    },
    computed: {
      columns() {
        return [
          {
            type: 'index',
            width: '50'
          },
          {
            prop: 'date',
            label: '日期',
            width: '120'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      }
    },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>
```
:::

## 多选

选择多行数据时使用 Checkbox。

:::demo 实现多选非常简单: 手动添加一个`el-table-column`，设`type`属性为`selection`即可；默认情况下若内容过多会折行显示，若需要单行显示可以使用`show-overflow-tooltip`属性，它接受一个`Boolean`，为`true`时多余的内容会在 hover 时以 tooltip 的形式显示出来。
```html
<template>
  <div class="demo-table" style="height: 250px">
    <aile-table
      ref="multipleTable"
      :data="tableData"
      :columns="columns"
      tooltip-effect="light"
      @selection-change="handleSelectionChange"
    />
  </div>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    computed: {
      columns() {
        return [
          {
            type: 'selection',
            width: '55'
          },
          {
            label: '日期',
            width: '120',
            render: (h, scope) => (
              <span>{scope.row.date}</span>
            )
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120'
          },
          {
            prop: 'address',
            label: '地址',
            showOverflowTooltip: true
          }
        ]
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
```
:::

## 排序

对表格进行排序，可快速查找或对比数据。

:::demo 在列中设置`sortable`属性即可实现以该列为基准的排序，接受一个`Boolean`，默认为`false`。可以通过 Table 的`default-sort`属性设置默认的排序列和排序顺序。可以使用`sort-method`或者`sort-by`使用自定义的排序规则。如果需要后端排序，需将`sortable`设置为`custom`，同时在 Table 上监听`sort-change`事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。在本例中，我们还使用了`formatter`属性，它用于格式化指定列的值，接受一个`Function`，会传入4个参数：`row`、`column`、`cellValue`和`$index`，可以根据自己的需求进行处理。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
      :default-sort = "{prop: 'date', order: 'descending'}"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            sortable: true,
            width: '180'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '180'
          },
          {
            prop: 'address',
            label: '地址',
            formatter: (row, column, cellValue, $index) => {
              return row.address
            }
          }
        ]
      }
    }
  }
</script>
```
:::

## 筛选

对表格进行筛选，可快速查找到自己想看的数据。

:::demo 在列中设置`filters` `filter-method`属性即可开启该列的筛选，filters 是一个数组，`filter-method`是一个方法，它用于决定某些数据是否显示，会传入三个参数：`value`, `row` 和 `column`。
```html
<template>
  <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button>
  <div class="demo-table" style="margin-top: 20px;">
    <aile-table
      ref="filterTable"
      :data="tableData"
      :columns="columns"
      :default-sort = "{prop: 'date', order: 'descending'}"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: '180',
            columnKey: "date",
            filters: [
              {text: '2016-05-01', value: '2016-05-01'}, 
              {text: '2016-05-02', value: '2016-05-02'}, 
              {text: '2016-05-03', value: '2016-05-03'}, 
              {text: '2016-05-04', value: '2016-05-04'}
            ],
            filterMethod: this.filterHandler
          },
          {
            prop: 'name',
            label: '姓名',
            width: 180
          },
          {
            prop: 'address',
            label: '地址',
            formatter: this.formatter
          },
          {
            prop: 'tag',
            label: '标签',
            width: 100,
            filters: [
              { text: '家', value: '家' }, 
              { text: '公司', value: '公司' }
            ],
            filterMethod: this.filterTag,
            filterPlacement: "bottom-end",
            render: (h, scope) => (
              <el-tag
                type={scope.row.tag === '家' ? 'primary' : 'success'}
                disable-transitions
              >
                {scope.row.tag}
              </el-tag>
            )
          }
        ]
      }
    },
    methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>
```
:::

## 自定义列模板

自定义列的显示内容，可组合其他组件使用。
:::demo 通过 `render` 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            width: 180,
            render: (h, scope) => (
              <div>
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{ scope.row.date }</span>
              </div>
            )
          },
          {
            label: '姓名',
            width: 180,
            render: (h, scope) => (
              <el-popover trigger="hover" placement="top">
                <p>姓名: { scope.row.name }</p>
                <p>住址: { scope.row.address }</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{ scope.row.name }</el-tag>
                </div>
              </el-popover>
            )
          },
          {
            label: '操作',
            render: (h, scope) => (
              <div>
                <el-button
                  size="mini"
                  onClick={() => this.handleEdit(scope.$index, scope.row)}>
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  onClick={() => this.handleDelete(scope.$index, scope.row)}>
                  删除
                </el-button>
              </div>
            )
          }
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
```
:::

## 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。
:::demo 通过设置 type="expand" 和 `Scoped slot` 可以开启展开行功能，`el-table-column` 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 `Scoped slot` 相同。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            type: 'expand',
            render: (h, scope) => {
              const props = {
                model: scope.row,
                columns: this.formColumns,
                labelPosition: 'left',
                inline: true,
              }
              return (
                <aile-form
                  class='demo-table-expand'
                  {...{props}}
                />
              )
            }
          },
          {
            prop: 'id',
            label: '商品 ID'
          },
          {
            prop: 'name',
            label: '商品名称'
          },
          {
            prop: 'desc',
            label: '描述'
          }
        ]
      },
      formColumns() {
        return [
          {
            prop: 'name',
            label: '商品名称'
          },
          {
            prop: 'shop',
            label: '所属店铺'
          },
          {
            prop: 'id',
            label: '商品 ID'
          },
          {
            prop: 'shopId',
            label: '店铺 ID'
          },
          {
            prop: 'category',
            label: '商品分类'
          },
          {
            prop: 'address',
            label: '店铺地址'
          },
          {
            prop: 'desc',
            label: '商品描述'
          }
        ]
      }
    }
  }
</script>
```
:::

## 树形数据与懒加载

:::demo 支持树类型的数据的显示。当 row 中包含 `children` 字段时，被视为树形数据。渲染树形数据时，必须要指定 `row-key`。支持子节点数据异步加载。设置 Table 的 `lazy` 属性为 true 与加载函数 `load` 。通过指定 row 中的 `hasChildren` 字段来指定哪些行是包含子节点。`children` 与 `hasChildren` 都可以通过 `tree-props` 配置。

```html
<template>
  <div class="demo-table" style="margin-bottom: 20px;">
    <aile-table
      :data="tableData"
      :columns="columns"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    />
  </div>

  <div class="demo-table">
    <aile-table
      :data="tableData1"
      :columns="columns"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期',
            sortable: true,
            width: 180
          },
          {
            prop: 'name',
            label: '姓名',
            width: 180
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      }
    },
    methods: {
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      }
    },
  }
</script>
```
:::

## 自定义表头

表头支持自定义。

:::demo 通过设置 `renderHeader` 来自定义表头。
```html
<template>
  <div class="demo-table">
    <aile-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '张三丰',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '吴亦凡',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '蔡徐坤',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: ''
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            renderHeader: (h, scope) => (
              <el-input
                v-model={this.search}
                size="mini"
                placeholder="输入关键字搜索"
              />
            ),
            render: (h, scope) => (
              <div>
                <el-button
                  size="mini"
                  on-click={() => this.handleEdit(scope.$index, scope.row)}>
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  on-click={() => this.handleDelete(scope.$index, scope.row)}>
                  删除
                </el-button>
              </div>
            )
          }
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  }
</script>
```
:::

## 表尾合计行

若表格展示的是各类数字，可以在表尾显示各列的合计。
:::demo 将`show-summary`设置为`true`就会在表格尾部展示合计行。默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过`sum-text`配置），其余列会将本列所有数值进行求合操作，并显示出来。当然，你也可以定义自己的合计逻辑。使用`summary-method`并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中，具体可以参考本例中的第二个表格。
```html
<template>
  <div class="demo-table" style="margin-bottom: 20px;">
    <aile-table
      :data="tableData"
      :columns="columns"
      border
      show-summary
    />
  </div>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
      border
      :summary-method="getSummaries"
      show-summary
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    computed: {
      columns() {
        return [
          {
            prop: 'id',
            label: 'ID',
            width: 180
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'amount1',
            label: '数值 1',
            sortable: true
          },
          {
            prop: 'amount2',
            label: '数值 2',
            sortable: true
          },
          {
            prop: 'amount3',
            label: '数值 3',
            sortable: true
          }
        ]
      }
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
  };
</script>
```
:::

## 合并行或列

多行或多列共用一个数据时，可以合并行或列。
:::demo 通过给`table`传入`span-method`方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行`row`、当前列`column`、当前行号`rowIndex`、当前列号`columnIndex`四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表`rowspan`，第二个元素代表`colspan`。 也可以返回一个键名为`rowspan`和`colspan`的对象。

```html
<template>
  <div class="demo-table" style="margin-bottom: 20px;">
    <aile-table
      :data="tableData"
      :columns="columns"
      :span-method="arraySpanMethod"
      border
    />
  </div>
  <div class="demo-table">
    <aile-table
      :data="tableData"
      :columns="columns"
      :span-method="objectSpanMethod"
      border
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    computed: {
      columns() {
        return [
          {
            prop: 'id',
            label: 'ID',
            width: 180
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'amount1',
            label: '数值 1',
            sortable: true
          },
          {
            prop: 'amount2',
            label: '数值 2',
            sortable: true
          },
          {
            prop: 'amount3',
            label: '数值 3',
            sortable: true
          }
        ]
      }
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  };
</script>
```
:::

## 自定义索引

自定义 `type=index` 列的行号。
:::demo 通过给 `type=index` 的列传入 `index` 属性，可以自定义索引。该属性传入数字时，将作为索引的起始值。也可以传入一个方法，它提供当前行的行号（从 `0` 开始）作为参数，返回值将作为索引展示。

```html
<template>
  <div class="demo-table" style="margin-bottom: 20px;">
    <aile-table
      :data="tableData"
      :columns="columns"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
          tag: '公司'
        }],
      }
    },
    computed: {
      columns() {
        return [
          {
            type: 'index',
            index: this.indexMethod
          },
          {
            prop: 'date',
            label: '日期',
            sortable: true,
            width: '180'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '180'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ]
      }
    },
    methods: {
      indexMethod(index) {
        return index * 2;
      }
    }
  };
</script>
```
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileTable` 配置如下属性：

|    参数     | 数据类型 | 默认值 |                                    说明                                     |
| :---------: | :------: | :----: | :-------------------------------------------------------------------------: |
|   config    |  Object  |   {}   |                       [Config配置项](#config-配置项)                        |
|    table    |  Object  |   {}   |      [ElTable Props](https://element.eleme.io/#/zh-CN/component/table)      |
| tableColumn |  Object  |   {}   |   [ElTabelColumn Props](https://element.eleme.io/#/zh-CN/component/table)   |
| pagination  |  Object  |   {}   | [ElPagination Props](https://element.eleme.io/#/zh-CN/component/pagination) |

### Config 配置项

|        参数         | 数据类型 | 默认值 |      可选值      |                    说明                    |
| :-----------------: | :------: | :----: | :--------------: | :----------------------------------------: |
|    cellEmptyText    |  String  |  '-'   |        -         |      表格单元数据为空时显示的文本内容      |
| paginationMarginTop |  Number  |   0    |        -         |     设置分页器与表格的间距，单位是'px'     |
|    tablePadding     |  Number  |   0    |        -         |   Table 的 Padding 值，计算表格高度会用    |
|     heightMode      |  String  | height | height/maxHeight |              自适应高度的选择              |
|        merge        |  Array   |   -    |        -         | 自动合并，值为需要合并的column中prop的数组 |

### Table Attributes 表格属性

仅展示必填项和新增项，其余参数见 [Element Doc Table #Table-column Attributes](https://element.eleme.io/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.io/#/zh-CN/component/pagination)

|    参数     | 数据类型 | 是否必须 | 默认值 |                                                      说明                                                       |
| :---------: | :------: | :------: | :----: | :-------------------------------------------------------------------------------------------------------------: |
|    data     |  Array   |    是    |   []   |                                                    表格数据                                                     |
|   columns   |  Array   |    是    |   []   |                                        表格列配置项，具体内容见下方说明                                         |
|   config    |  Number  |    否    |   {}   |                                         [Config配置项](#config-配置项)                                          |
| pagination  |  Object  |    否    |  null  |                   [ElPagination Props](https://element.eleme.io/#/zh-CN/component/pagination)                   |
|    table    |  Object  |    否    |   {}   |                        [ElTabe Props](https://element.eleme.io/#/zh-CN/component/table)                         |
| tableColumn |  Object  |    否    |   {}   | [ElTabelColumn Props](https://element.eleme.io/#/zh-CN/component/table) 针对该表格下的所有ElTableColumn进行设置 |

### Table Events 表格事件

仅展示新增事件，其余事件见 [Element Doc Table #Table Events](https://element.eleme.io/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.io/#/zh-CN/component/pagination)

注意：由于 ElPagination 和 ElTable 具有相同的事件：`current-change`，所以对 `ElPagination` 进行调整：

|       事件名        |                说明                |    参数     |
| :-----------------: | :--------------------------------: | :---------: |
| page-current-change | 同 el-pagination 的 current-change | currentPage |
### Table Methods 表格方法

支持全部 `el-table` 和 `el-pagination` 方法，详见 [Element Doc Table #Table Methods](https://element.eleme.io/#/zh-CN/component/table) 及 [Element Doc Pagination](https://element.eleme.io/#/zh-CN/component/pagination)

### Table Slot 表格插槽

|    name    |                                   说明                                   |
| :--------: | :----------------------------------------------------------------------: |
|   append   | 插入至表格最后一行之后的内容。若表格有合计行，该 slot 会位于合计行之上。 |
|   empty    |                         空数据时显示的文本内容。                         |
| pagination |             分页器中的自定义内容，需要在 layout 中列出 slot              |

### Column 列配置项

仅展示必填项和新增项，其余参数见 [Element Doc Table #Table-column Attributes](https://element.eleme.io/#/zh-CN/component/table)

|     参数     |         数据类型         | 是否必须 |               说明                |
| :----------: | :----------------------: | :------: | :-------------------------------: |
|    render    | Function(context)/VNode  |    否    |   自定义渲染内容,可选返回 VNode   |
| renderHeader | Function(context)/VNode  |    否    | 自定义表头渲染内容,可选返回 VNode |
|  formatter   | Function(context)/string |    否    |  自定义渲染内容，可选返回字符串   |
|     show     |    Function()/boolean    |    否    |      是否渲染该列，默认渲染       |