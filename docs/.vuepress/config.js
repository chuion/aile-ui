const path = require("path");

module.exports = {
  title: "AileUI",
  description: "AileUI Documents",
  plugins: ["demo-container"],
  alias: {
    "aile-ui": path.resolve(__dirname, "../../"),
  },
  head: [
    [
      "link", // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: "icon", href: "favicon.ico" },
    ],
  ],
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      {
        text: "组件",
        link: "/components/",
      },
      {
        text: "Github",
        link: "https://github.com/chuion/aile-ui",
        target: "_blank",
      },
    ],
    sidebar: {
      "/components/": [
        "",
        "input",
        "avatar",
        "card",
        "dialog",
        "form",
        "input",
        "link",
        // 'placement',
        "select",
        "table",
        "tooltip",
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolveLoader
    .modules
    .add(path.resolve(__dirname, './node_modules'))
  },
};
