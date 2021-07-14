const path = require("path");

module.exports = {
  base: '/aile-ui/',
  plugins: ["demo-container"],
  alias: {
    "aile-ui": path.resolve(__dirname, "../../"),
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'AileUI',
      description: 'AileUI 中文文档 爱了爱了'
    }
  },
  head: [
    [
      "link", // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: "icon", href: "/favicon.ico" },
    ],
  ],
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      {
        text: "组件",
        link: "/aile-ui/components/",
      },
      {
        text: "Github",
        link: "https://github.com/chuion/aile-ui",
        target: "_blank",
      },
    ],
    sidebar: {
      "/aile-ui/components/": [
        "",
        "input",
        "avatar",
        "card",
        "dialog",
        "form",
        "link",
        "select",
        "table",
        "tooltip",
      ],
    },
  }
};
