(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{291:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"electron项目问题处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#electron项目问题处理"}},[t._v("#")]),t._v(" electron项目问题处理")]),t._v(" "),s("h2",{attrs:{id:"序列画布设计思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#序列画布设计思路"}},[t._v("#")]),t._v(" 序列画布设计思路")]),t._v(" "),s("p",[t._v("所有节点遵循整体从上到下的执行顺序，存在特殊组件则根据特殊策略执行")]),t._v(" "),s("p",[t._v("主体画布改动点\n初层画布删除，入口改为从流程图序列组件的编辑按钮进入序列画布\n画布删除后，画布功能是否有影响或遗漏\n序列组件无法展示特殊组件，如何改动合适，还是维持不变？\n首页和设置的画布模式删除，\n其它画布模式的数据关联点要处理\n流程json文件中的画布模式是否删除等\n智能设计增加按钮返回到序列画布或者流程图画布\n涉及到的改动\n改动可能涉及到的功能问题，\n智能模式，序列画布，流程画布等导出功能\n目的\n降低用户使用成本和学习成本\n流程文件扁平化存储\n序列特殊组件收缩后在画布的展示，发布、导出屏蔽原来的流程块逻辑")]),t._v(" "),s("h2",{attrs:{id:"特殊组件适配序列画布工作项展开收起"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特殊组件适配序列画布工作项展开收起"}},[t._v("#")]),t._v(" 特殊组件适配序列画布工作项展开收起")]),t._v(" "),s("p",[t._v("判断文件是否存在、判断元素是否存在、判断目标是否存在、异常组件、循环、遍历，以上组件的嵌套适配\n先看交接文档，哪些组件已经适配，哪些问题需要注意并解决\n五个特殊组件需要满足可互相嵌套，连线逻辑，断点逻辑，折叠逻辑等")]),t._v(" "),s("ul",[s("li",[t._v("条件判断")]),t._v(" "),s("li",[t._v("执行循环")]),t._v(" "),s("li",[t._v("遍历")]),t._v(" "),s("li",[t._v("处理异常")]),t._v(" "),s("li",[t._v("折叠")])]),t._v(" "),s("h2",{attrs:{id:"序列画布问题待解决"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#序列画布问题待解决"}},[t._v("#")]),t._v(" 序列画布问题待解决")]),t._v(" "),s("p",[t._v("流程画布执行循环，从loop_node锚点连出线，循环执行其后的节点\n序列画布模式执行循环时应该默认循环执行循环内的节点，因为在序列中是没有loop_node锚点连线的，\n该问题在沉浸式和序列画布模式均存在待解决，可能需要执行器配合修改")]),t._v(" "),s("p",[t._v("2.20号会议改动内容记录\n1、candition_data的内容跟propertier中的value内容一致，需要删除candition_data，并把value其下的nodes中的节点信息只保存节点id，把相对应的节点信息存放到跟特殊组件节点同级目录下\n2、特殊组件嵌套处理\n3、遍历组件适配")]),t._v(" "),s("h2",{attrs:{id:"导出导入流程块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#导出导入流程块"}},[t._v("#")]),t._v(" 导出导入流程块")]),t._v(" "),s("p",[t._v("导出需要保存流程块的节点信息，包括id，锚点，定位，属性等，还有流程块内的节点\n导入需要分别插入流程块和节点信息")]),t._v(" "),s("h2",{attrs:{id:"发现的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#发现的问题"}},[t._v("#")]),t._v(" 发现的问题")]),t._v(" "),s("p",[t._v("智能设计涉及到的问题，\n特殊组件内部插入组件方式（插入线显示有问题，拖入有问题），\n流程块切换数据未切换，\n序列画布遍历组件后连接一个打印则为正常执行遍历内部的节点组件\n节点参数编辑，特殊组件内嵌套节点删除等右键功能，执行")]),t._v(" "),s("p",[t._v("配置业务组件，推荐窗口展示，点击后插入对应节点到序列中，对执行器包装为一个点击组件，完成")]),t._v(" "),s("h2",{attrs:{id:"序列画布数据扁平化思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#序列画布数据扁平化思路"}},[t._v("#")]),t._v(" 序列画布数据扁平化思路")]),t._v(" "),s("p",[t._v("原因分析：\n遍历连线，嵌套节点连线从内部开始执行，\n问题：多层嵌套下，中间的嵌套节点尚未插入\n遍历注意source的格式是条件锚点的，target节点才是嵌套节点\n解决思路：\n遍历整个graphdata下的nodes，找到插入起始节点，插入目标，\n保存到json时删除各嵌套节点下的nodes")]),t._v(" "),s("p",[t._v("第二方案\n扁平化设计思路，主要目标为在初始化画布之前，将sequence的nodes数据处理为之前模式的数据形式，该方案也需要向节点内部递归遍历以处理数据，优点在于遍历顺序相对不那么混乱容易理解，而且初始化方法不用做任何修改")]),t._v(" "),s("p",[t._v("第一层遍历线条\n第二层")]),t._v(" "),s("p",[t._v("遍历当前序列所有节点,拿到source和target节点\n再一次遍历所有节点，分情况插入节点：")]),t._v(" "),s("p",[t._v("如果source是特殊组件那么target必然是其嵌套节点的第一个，找到并插入target；\n如果要插入第二个节点，source可能是普通节点，线从底部连出，\n需要找到它的source节点插入在哪了，然后跟着插入（它们都是嵌套节点，而且父节点必然是特殊组件）")]),t._v(" "),s("h2",{attrs:{id:"特殊组件的无限嵌套"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特殊组件的无限嵌套"}},[t._v("#")]),t._v(" 特殊组件的无限嵌套")]),t._v(" "),s("p",[t._v("组件之间互相嵌套，并且可以嵌套自身无限次\n引入自身的时候，常规引入组件的方式会报错组件未注册，此时需要采用另一种方式，在"),s("code",[t._v("beforeCreate")]),t._v("中注册")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("beforeCreate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ConditionIf'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./condition_if.vue'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ExceptionCatch'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./exceptionCatch.vue'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ProcessIterator'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./processIterator.vue'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ProcessWhile'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./processWhile.vue'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("components"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ProcessFold'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./processFold.vue'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"沉浸式模式设计与问题处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#沉浸式模式设计与问题处理"}},[t._v("#")]),t._v(" 沉浸式模式设计与问题处理")]),t._v(" "),s("p",[t._v("沉浸式设计中：输入文本，不用提示框和确认按钮，默认盖一层输入框即可，不用推荐输入文本组件。\n拾取输入框\n动态改变输入组件宽高\n通过检测输入框拾取焦点或按下回车键确认输入完成")]),t._v(" "),s("p",[t._v("滚动桌面，关闭拾取推荐窗\n方案：用户无操作通过鼠标位置是否改变，设置定时器3-5秒控制\n问题\n用户正常识别元素无操作超时也会执行关闭逻辑\n原因：窗口穿透无法获取窗口滚动事件，若关闭窗口穿透则拾取窗口下的网页无法滚动\n问题待优化\n推荐窗几率出现卡屏，拾取窗口已消失，推荐窗还在，重新开启设计后问题消失，疑似拾取元素出现问题导致\n滚动窗口重新根据鼠标位置拾取元素判断并关闭推荐窗，请求次数太多问题优化")]),t._v(" "),s("h2",{attrs:{id:"拾取"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#拾取"}},[t._v("#")]),t._v(" 拾取")]),t._v(" "),s("p",[t._v("2.1.1.2 拾取窗口优化需求\n文本，按钮，超链接 ，输入框\n自动生成组件\n按钮，超链接，")]),t._v(" "),s("p",[t._v("如果拾取到的元素的推荐组件第一个是鼠标单击则不展示推荐窗口，\n在拾取穿梭框覆盖一层div，添加点击事件（相应不到？），监听并插入组件，如果鼠标移动关掉div，再拾取重新开启div\n如果拾取到输入框\n用箭头控制推荐窗口的展开和收起\n10.28会议总结技术方案")]),t._v(" "),s("h1",{attrs:{id:"node相关"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node相关"}},[t._v("#")]),t._v(" NODE相关")]),t._v(" "),s("h2",{attrs:{id:"文件读取"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件读取"}},[t._v("#")]),t._v(" 文件读取")])])}),[],!1,null,null,null);s.default=e.exports}}]);