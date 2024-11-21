(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{306:function(t,s,a){"use strict";a.r(s);var r=a(14),e=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"服务器配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#服务器配置"}},[t._v("#")]),t._v(" 服务器配置")]),t._v(" "),s("h2",{attrs:{id:"nginx配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx配置"}},[t._v("#")]),t._v(" nginx配置")]),t._v(" "),s("h2",{attrs:{id:"node-serve配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-serve配置"}},[t._v("#")]),t._v(" node serve配置")]),t._v(" "),s("h2",{attrs:{id:"json-server配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#json-server配置"}},[t._v("#")]),t._v(" json-server配置")]),t._v(" "),s("p",[t._v("没有接口测试很烦恼？试试"),s("code",[t._v("json-server")]),t._v("，不需要具备后端知识。\n相关资料："),s("a",{attrs:{href:"https://juejin.cn/post/7043424909472563208#heading-4",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://juejin.cn/post/7043424909472563208#heading-4"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"入门篇"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#入门篇"}},[t._v("#")]),t._v(" 入门篇")]),t._v(" "),s("p",[t._v("5分钟实现本地搭建和增删改查，满足入门测试使用。\n使用json-server需要遵守一定规范")]),t._v(" "),s("ul",[s("li",[t._v("数据查询用"),s("code",[t._v("GET")])]),t._v(" "),s("li",[t._v("新增数据用"),s("code",[t._v("POST")])]),t._v(" "),s("li",[t._v("删除数据用"),s("code",[t._v("DELETE")])]),t._v(" "),s("li",[t._v("修改数据用"),s("code",[t._v("PUT")]),t._v("和"),s("code",[t._v("PATCH")])])]),t._v(" "),s("h4",{attrs:{id:"起步"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#起步"}},[t._v("#")]),t._v(" 起步")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("node")]),t._v("环境安装。")]),t._v(" "),s("li",[t._v("安装 "),s("code",[t._v("json-server")]),t._v("。在终端输入以下命令"),s("code",[t._v("npm install -g json-server")])]),t._v(" "),s("li",[t._v("创建数据库（一个"),s("code",[t._v("json")]),t._v("文件）。例：创建"),s("code",[t._v("json-server-demo")]),t._v("文件夹，在其中创建"),s("code",[t._v("db.json")]),t._v("文件，添加数据（可以用官方数据，也可以用自己的）")])]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"posts"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" \n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"title"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"json-server"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"author"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"typicode"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"comments"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"body"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"some comment"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"postId"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"profile"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"typicode"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[t._v("启动服务。进入 "),s("code",[t._v("json-server-demo")]),t._v("目录，在终端输入以下命令启动即可， "),s("code",[t._v("json-server --watch db.json --port 5000")])])]),t._v(" "),s("h3",{attrs:{id:"进阶篇"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进阶篇"}},[t._v("#")]),t._v(" 进阶篇")]),t._v(" "),s("p",[t._v("主要详解常用查询操作，还包括常规配置，静态资源配置等")])])}),[],!1,null,null,null);s.default=e.exports}}]);