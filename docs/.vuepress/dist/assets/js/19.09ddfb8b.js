(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{567:function(t,s,a){"use strict";a.r(s);var e=a(32),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[t._v("#")]),t._v(" 简介")]),t._v(" "),a("p",{attrs:{align:"center"}},[a("img",{attrs:{src:"/logo.png",width:"400"}})]),t._v(" "),a("p",{attrs:{align:"center"}},[a("a",{attrs:{href:"https://www.npmjs.org/package/aile-ui"}},[a("img",{attrs:{src:"https://img.shields.io/npm/v/aile-ui.svg"}})]),t._v(" "),a("a",{attrs:{href:"https://npmcharts.com/compare/aile-ui?minimal=true"}},[a("img",{attrs:{src:"http://img.shields.io/npm/dm/aile-ui.svg"}})]),t._v(" "),a("a",{attrs:{href:"LICENSE"}},[a("img",{attrs:{src:"https://img.shields.io/badge/License-MIT-yellow.svg"}})])]),t._v(" "),a("h2",{attrs:{id:"特色"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特色"}},[t._v("#")]),t._v(" 特色")]),t._v(" "),a("p",[a("code",[t._v("AileUI")]),t._v(" 是一个基于 "),a("a",{attrs:{href:"https://cn.vuejs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue 2"),a("OutboundLink")],1),t._v(" 和 "),a("a",{attrs:{href:"https://element.eleme.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("Element UI"),a("OutboundLink")],1),t._v(" 进行二次开发的UI库，包含以下常用组件：")]),t._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/components/lib/autocomplete/"}},[t._v("Autocomplete 带输入建议的输入框")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/avatar/"}},[t._v("Avatar 头像")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/card/"}},[t._v("Card 卡片容器")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/dialog/"}},[t._v("Dialog 对话框")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/form/"}},[t._v("Form 表单")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/input/"}},[t._v("Input 输入框")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/link/"}},[t._v("Link 链接")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/select/"}},[t._v("Select 下拉选择器")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/table/"}},[t._v("Table 表格")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/components/lib/tooltip/"}},[t._v("Tooltip 提示框")])],1)]),t._v(" "),a("p",[t._v("每种组件均在原有 "),a("code",[t._v("ElementUI")]),t._v(" 的基础上进行了功能增强，例如 "),a("code",[t._v("Form")]),t._v(" 和 "),a("code",[t._v("Table")]),t._v(" 组件实现了配置化开发，可通过书写JSX语法传入 "),a("code",[t._v("column")]),t._v(" 属性完成配置，而 "),a("code",[t._v("Select")]),t._v(" 和 "),a("code",[t._v("Autocomplete")]),t._v(" 组件则实现了无限滚动加载的功能，更多功能可点击上方列表阅读相应 "),a("code",[t._v("README.md")]),t._v(" 文档")]),t._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("p",[t._v("通过 "),a("code",[t._v("npm")]),t._v(" 或者 "),a("code",[t._v("yarn")]),t._v(" 安装项目")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i aile-ui element-ui\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 或者")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" aile-ui element-ui\n")])])]),a("h2",{attrs:{id:"快速开始"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速开始"}},[t._v("#")]),t._v(" 快速开始")]),t._v(" "),a("p",[t._v("引用组件，根据需要可全局引入或者局部引入\n注意：由于 "),a("code",[t._v("AileUI")]),t._v(" 是基于 "),a("code",[t._v("ElementUI")]),t._v(" 进行的二次开发，因此需全局引入 "),a("code",[t._v("ElementUI")]),t._v(" 组件后方可正常使用")]),t._v(" "),a("p",[a("code",[t._v("main.js")]),t._v(" 全局引入")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Vue "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Element "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'element-ui'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'element-ui/lib/theme-chalk/index.css'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 方式1：引入全部组件包并设置参数，key的名称是组件类别")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" AileUI "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aile-ui'")]),t._v("\nVue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AileUI"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  autocomplete"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    clearable"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    config"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      trim"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 方式2：引入单独组件并设置参数")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" AileAutocomplete "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aile-ui/lib/autocomplete'")]),t._v("\nVue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AileAutocomplete"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  clearable"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  config"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    trim"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("code",[t._v("Demo.vue")]),t._v(" 局部引入")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" AileAutocomplete "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aile-ui/lib/autocomplete'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    components"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        AileAutocomplete\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);