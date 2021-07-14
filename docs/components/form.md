# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

:::tip 简介
`aile-ui/form` 是一款 **Form** 组件，基于 `Vue2` 和 `ElementUI` 进行的二次封装，使用组件时，在原 `ElForm` 属性的基础上新增 `config` 属性，增强 Form 的功能。
强烈建议配合AileUI其他组件一起使用，解决诸如 `Select` 组件远程请求回来的数据需要自行实现双向数据绑定的问题。
:::

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

:::demo 在 AileForm 组件中，表单域由 `columns` 中配置生成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
```html
<div class="demo-form">
  <aile-form 
    ref="form" 
    :model="form" 
    :columns="columns"
    label-width="80px"
  />
</div>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
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
            label: '活动时间',
            render: (h, form) => (
              <el-row>
                <el-col span={11}>
                  <el-date-picker type="date" placeholder="选择日期" v-model={form.date1} style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" span={2}>-</el-col>
                <el-col span={11}>
                  <el-time-picker placeholder="选择时间" v-model={form.date2} style="width: 100%;"></el-time-picker>
                </el-col>
              </el-row>
            )
          },
          {
            prop: 'delivery',
            label: '即时配送',
            render: (h, form) => (
              <el-switch v-model={form.delivery}></el-switch>
            )
          },
          {
            prop: 'type',
            label: '活动性质',
            render: (h, form) => (
              <el-checkbox-group v-model={form.type}>
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            )
          },
          {
            prop: 'resource',
            label: '特殊资源',
            render: (h, form) => (
              <el-radio-group v-model={form.resource}>
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
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
:::

:::tip
W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：
> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `<el-form>` 标签上添加 `@submit.native.prevent`。
:::

## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

:::demo 设置 `inline` 属性可以让表单域变为行内的表单域
```html
<div class="demo-form">
  <aile-form 
    class="demo-form-inline" 
    :model="formInline"
    :columns="columns" 
    :inline="true" 
  />
</div>

<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    computed: {
      columns() {
        return [
          {
            prop: 'user',
            label: '审批人',
            render: (h, form) => (
              <aile-input v-model={form.user} placeholder="审批人" />
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
            label: '',
            render: h => (
              <el-button type="primary" onClick={this.onSubmit}>查询</el-button>
            )
          }
        ]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
```
:::

## 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

:::demo 通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 `top`、`left`，当设为 `top` 时标签会置于表单域的顶部
```html
<el-radio-group v-model="labelPosition" size="small">
  <el-radio-button label="left">左对齐</el-radio-button>
  <el-radio-button label="right">右对齐</el-radio-button>
  <el-radio-button label="top">顶部对齐</el-radio-button>
</el-radio-group>
<div style="margin: 20px;"></div>
<aile-form 
  :label-position="labelPosition" 
  label-width="80px" 
  :model="formLabelAlign" 
  :columns="columns"
/>

<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    computed: {
      columns() {
        return [
          {
            prop: 'name',
            label: '名称',
            render: (h, form) => (
              <el-input v-model={form.name} />
            )
          },
          {
            prop: 'region',
            label: '活动区域',
            render: (h, form) => (
              <el-input v-model={form.region} />
            )
          },
          {
            prop: 'type',
            label: '活动形式',
            render: (h, form) => (
              <el-input v-model={form.type} />
            )
          }
        ]
      }
    }
  }
</script>
```
:::

## 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

:::demo Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)
```html
<div class="demo-form">
  <aile-form 
    :model="ruleForm" 
    :columns="columns"
    :rules="rules" 
    ref="ruleForm" 
    label-width="100px" 
    class="demo-ruleForm" 
  />
</div>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
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
            label: '活动时间',
            render: (h, form) => (
              <el-row>
                <el-col span={11}>
                  <el-date-picker type="date" placeholder="选择日期" v-model={form.date1} style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" span={2}>-</el-col>
                <el-col span={11}>
                  <el-time-picker placeholder="选择时间" v-model={form.date2} style="width: 100%;"></el-time-picker>
                </el-col>
              </el-row>
            )
          },
          {
            prop: 'delivery',
            label: '即时配送',
            render: (h, form) => (
              <el-switch v-model={form.delivery}></el-switch>
            )
          },
          {
            prop: 'type',
            label: '活动性质',
            render: (h, form) => (
              <el-checkbox-group v-model={form.type}>
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            )
          },
          {
            prop: 'resource',
            label: '特殊资源',
            render: (h, form) => (
              <el-radio-group v-model={form.resource}>
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
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
                <el-button type="primary" onClick={() => this.onSubmit('ruleForm')}>立即创建</el-button>
                <el-button onClick={() => this.resetForm('ruleForm')}>重置</el-button>
              </div>
            )
          }
        ]
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
```
:::

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

:::demo 本例还使用`status-icon`属性为输入框添加了表示校验结果的反馈图标。
```html
<div class="demo-form">
  <aile-form 
    :model="ruleForm" 
    :columns="columns"
    status-icon 
    :rules="rules" 
    ref="ruleForm" 
    label-width="100px" 
    class="demo-ruleForm" 
  />
</div>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
      columns() {
        return [
          {
            prop: 'pass',
            label: '密码',
            render: (h, form) => (
              <aile-input 
                type='password'
                v-model={form.pass}
                autocomplete='off'
              />
            )
          },
          {
            prop: 'checkPass',
            label: '确认密码',
            render: (h, form) => (
              <aile-input 
                type='password'
                v-model={form.checkPass}
                autocomplete='off'
              />
            )
          },
          {
            prop: 'age',
            label: '年龄',
            render: (h, form) => (
              <aile-input v-model_number={form.age} />
            )
          },
          {
            label: '',
            render: h => (
              <div>
                <el-button type="primary" onClick={() => this.submitForm('ruleForm')}>提交</el-button>
                <el-button onClick={() => this.resetForm('ruleForm')}>重置</el-button>
              </div>
            )
          }
        ]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
```
:::

:::tip
1. 自定义校验 callback 必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。
2. 除了在 Form 组件上一次性传递所有的验证规则外还可以在单个的表单域上传递属性的验证规则
:::

## 动态增减表单项

AileForm 可以通过配置 `config.columns.items` 实现快速创建数组表单项。

:::demo 
```html
<div class="demo-form">
  <aile-form 
    :model="dynamicValidateForm" 
    :columns="columns"
    ref="dynamicValidateForm" 
    label-width="100px" 
    label-position="right"
    class="demo-dynamic"
  />
</div>

<script>
  export default {
    data() {
      return {
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }
      };
    },
    computed: {
      columns() {
        return [
          {
            prop: 'email',
            label: '邮箱',
            rules: [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            render: (h, form) => (
              <aile-input v-model={form.email} />
            )
          },
          {
            prop: 'domains',
            label: '域名',
            items: () => [
              {
                prop: 'value',
                renderLabel: (h, form, root, scope) => <span>域名{scope.itemIndex}</span>,
                rules: { required: true, message: '域名不能为空', trigger: 'blur' },
                render: (h, form) => (
                  <aile-input v-model={form.value} />
                )
              }
            ]
          },
          {
            label: '',
            render: h => (
              <div>
                <el-button type='primary' onClick={() => this.submitForm('dynamicValidateForm')}>提交</el-button>
                <el-button onClick={() => this.resetForm('dynamicValidateForm')}>重置</el-button>
              </div>
            )
          }
        ]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>
```
:::

## 数字类型验证

:::demo 数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 `Vue` 自身提供的用于将绑定值转化为 `number` 类型的修饰符。**在Vue中使用JSX语法时，修饰符采用下 `_number` 的方式**
```html
<div class="demo-form">
  <aile-form 
    :model="numberValidateForm"
    :columns="columns"
    ref="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  />
</div>

<script>
  export default {
    data() {
      return {
        numberValidateForm: {
          age: ''
        }
      };
    },
    computed: {
      columns() {
        return [
          {
            prop: 'age',
            label: '年龄',
            rules: [
              { required: true, message: '年龄不能为空'},
              { type: 'number', message: '年龄必须为数字值'}
            ],
            render: (h, form) => (
              <aile-input 
                type="age" 
                v-model_number={form.age}
                autocomplete="off" 
              />
            )
          },
          {
            label: '',
            render: h => (
              <div>
                <el-button type='primary' onClick={() => this.submitForm('numberValidateForm')}>提交</el-button>
                <el-button onClick={() => this.resetForm('numberValidateForm')}>重置</el-button>
              </div>
            )
          }
        ]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
```
:::

:::tip
嵌套在 `el-form-item` 中的 `el-form-item` 标签宽度默认为零，不会继承 `el-form` 的 `label-width`。如果需要可以为其单独设置 `label-width` 属性。
:::

## 嵌套表单

AileForm 可以通过配置 `config.columns.children` 实现表单的嵌套。

:::demo
```html
<div class="demo-form">
  <aile-form 
    ref="form" 
    :model="nestForm"
    :columns="columns" 
    label-width="80px" 
    size="mini"
  />
</div>

<script>
  export default {
    data() {
      return {
        nestForm: {
          time: {
            label: '',
            value: {
              year: '',
              month: ''
            }
          }
        }
      };
    },
    computed: {
      columns() {
        return [
          {
            prop: 'time',
            label: '时间',
            children: [
              {
                prop: 'label',
                label: '标签',
                render: (h, form) => (
                  <aile-input v-model={form.label} />
                )
              },
              {
                prop: 'value',
                label: '信息',
                children: [
                  {
                    prop: 'year',
                    label: '年',
                    render: (h, form) => (
                      <aile-input v-model={form.year} />
                    )
                  },
                  {
                    prop: 'month',
                    label: '月',
                    render: (h, form) => (
                      <aile-input v-model={form.month} />
                    )
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  };
</script>
```
:::


## 表单内组件尺寸控制

通过设置 Form 上的 `size` 属性可以使该表单内所有可调节大小的组件继承该尺寸。Form-Item 也具有该属性。

:::demo 如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的`size`属性，直接为这个表单项或表单组件设置自己的`size`即可。
```html
<div class="demo-form">
  <aile-form 
    ref="form" 
    :model="sizeForm"
    :columns="columns" 
    label-width="80px" 
    size="mini"
  />
</div>

<script>
  export default {
    data() {
      return {
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          type: [],
          resource: ''
        }
      };
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
            label: '活动时间',
            render: (h, form) => (
              <el-row>
                <el-col span={11}>
                  <el-date-picker type="date" placeholder="选择日期" v-model={form.date1} style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" span={2}>-</el-col>
                <el-col span={11}>
                  <el-time-picker placeholder="选择时间" v-model={form.date2} style="width: 100%;"></el-time-picker>
                </el-col>
              </el-row>
            )
          },
          {
            prop: 'type',
            label: '活动性质',
            render: (h, form) => (
              <el-checkbox-group v-model={form.type}>
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            )
          },
          {
            prop: 'resource',
            label: '特殊资源',
            render: (h, form) => (
              <el-radio-group v-model={form.resource} size='medium'>
                <el-radio border label="线上品牌商赞助"></el-radio>
                <el-radio border label="线下场地免费"></el-radio>
              </el-radio-group>
            )
          },
          {
            label: '',
            size: 'large',
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
        console.log('submit!');
      }
    }
  };
</script>
```
:::

## 配置项

### 插件配置

在 `main.js` 中通过插件方式引入 AileUI 时（使用方式：[插件安装](/components/#快速开始)），可对全局的 `AileForm` 配置如下属性：

|   参数   | 数据类型 | 默认值 |                                           说明                                           |
| :------: | :------: | :----: | :--------------------------------------------------------------------------------------: |
|  config  |  Object  |   {}   |                             [Config 配置项](#config-配置项)                              |
|   form   |  Object  |   {}   |             [ElForm Props](https://element.eleme.io/#/zh-CN/component/form)              |
| formItem |  Object  |   {}   | [ElFormItem Props](https://element.eleme.io/#/zh-CN/component/form#form-item-attributes) |

### config 配置项

|   参数    | 数据类型 | 默认值 |        说明        |
| :-------: | :------: | :----: | :----------------: |
| emptyText |  String  |  '-'   |     空白占位符     |
|  layout   |  Object  |  null  | ElLayout Row Props |

### Form Attributes 表单属性

仅展示必填项和新增项，其余参数见 [Element Doc Form #Form Attributes](https://element.eleme.io/#/zh-CN/component/form)

|   参数   | 数据类型 | 是否必须 | 默认值 | 可选值 |                                           说明                                           |
| :------: | :------: | :------: | :----: | :----: | :--------------------------------------------------------------------------------------: |
|  model   |  Object  |    是    |   -    |   -    |                                表单数据(使用方式同ElForm)                                |
| columns  |  Array   |    是    |   -    |   -    |                             [表单列配置项](#column-列配置项)                             |
|  config  |  Array   |    是    |   -    |   -    |                             [Config 配置项](#config-配置项)                              |
|   form   |  Array   |    是    |   -    |   -    |             [ElForm Props](https://element.eleme.io/#/zh-CN/component/form)              |
| formItem |  Array   |    是    |   -    |   -    | [ElFormItem Props](https://element.eleme.io/#/zh-CN/component/form#form-item-attributes) |


### Form Methods 表单方法

支持全部 `el-form` 方法，详见 [Element Doc Form #Form Methods](https://element.eleme.io/#/zh-CN/component/form)

### Form Events 表单事件

支持全部 `el-form` 方法，详见 [Element Doc Form #Form Events](https://element.eleme.io/#/zh-CN/component/form)

### Form-Item Methods 表单列方法

暂不支持

### Column 列配置项

仅展示必填项和新增项，其余参数见 [Element Doc Form #Form-column Attributes](https://element.eleme.io/#/zh-CN/component/form)

|     参数      |                数据类型                | 是否必须 |                                            说明                                             |
| :-----------: | :------------------------------------: | :------: | :-----------------------------------------------------------------------------------------: |
|     prop      |                 String                 |    否    |                           设置表单列的别名(非必须，但是建议设置)                            |
|     label     |                 String                 |    否    |                         设置表单列的显示标签(非必须，但是建议设置)                          |
|    render     |    Function(h, form, root) => VNode    |    否    |                                自定义渲染内容,可选返回VNode                                 |
|   formatter   |     Function(form, root) => string     |    否    |                               自定义渲染内容，可选返回字符串                                |
|   children    |                 Array                  |    否    |          当数据项类型为[object]时使用,返回column数组,与render/formatter/items互斥           |
|     items     | Function(form, root) => [column, ...]  |    否    | 当数据项类型为[array]时使用,可动态增删子节点,返回column数组,与render/formatter/children互斥 |
|  buttonText   |                 String                 |    否    |                               设置数组表单-添加按钮的文字内容                               |
|  buttonClass  |                 String                 |    否    |                               设置数组表单-添加按钮的图标类名                               |
| defaultValue  |                   -                    |    否    |          当上一级数据项类型为[array]，且传递了[items]属性时使用,可设置数据项初始值          |
|     show      |    Function(form, root) => boolean     |    否    |                                   是否渲染该列，默认渲染                                    |
|    layout     |                 Object                 |    否    |                    设置布局模式，可传入[el-row]和[el-col]支持的所有属性                     |
|  renderLabel  |     Function(h, form, root)/VNode      |    否    |                                       自定义标签内容                                        |
|  renderError  | Function(h, form, root, {error})/VNode |    否    |                                自定义表单校验信息的显示方式                                 |
|  labelWidth   |                 String                 |    否    |                     设置当前表单域标签的宽度，例如 '50px'，支持 auto。                      |
| labelPosition |                 String                 |    否    |                   设置当前表单域标签的位置，可选值：right/center/left/top                   |