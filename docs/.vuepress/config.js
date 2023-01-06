module.exports = {
    publicPath: '/',
    title: '飞琼神仙客',//首页logo文字
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: "/robot.gif" }],  //浏览器的标签栏的网页图标
    ],
    base: "/storm.github.io/",//设置仓库名称，部署时放开
    dest: "./dist",//打包到的目录，部署时放开
    themeConfig: {
        logo: "/robot.gif",//首页导航栏logo
        searchMaxSuggestions: 10,//搜索结果数量
        nav: [
            //页面路由默认读取目录下的readme.md
            { text: 'Home', link: '/' },
            { text: 'Vue',
                items: [
                    {text: 'vue2', link: '/vue/vue2.md'},
                    {text: 'vue3', link: '/vue/vue3.md'},
                    {text: 'vuex', link: '/vue/vuex.md'},
                ]
            },
            {
                text: 'React',
                items: [
                    {text: 'react进阶', link: '/react/reactExtend.md'},
                    {text: 'react与vue区别', link: '/react/reactDiff.md'},
                    // {text: 'react状态管理', link: '/react/reactState.md'},
                    // {text: 'react组件封装', link: '/others/flutter'},
                    // {text: 'react源码分析', link: '/others/flutter'},
                    // {text: '实战总结', link: '/others/flutter'},
                ]
            },
            // {
            //     text: 'nodejs',
            //     items: [
            //         {text: 'node框架', link: '/node/frame'},
            //         {text: 'node网络与部署', link: '/node/netDeploy'},
            //         // {text: 'express-ts实战', link: '/others/flutter'},
            //     ]
            // },
            // {
            //     text: 'ts',
            //     items: [
            //         {text: 'js基础', link: '/js/README'},
            //         {text: 'ts初探', link: '/js/tsFirst'},
            //         {text: 'ts基础', link: '/js/tsSecond'},
            //         {text: 'ts工程', link: '/js/tsThird'},
            //     ]
            // },
            {
                text: '工程化',
                items: [
                    // {text: '前端工程化', link: '/Engineering/Engineering'},
                    // {text: 'webpack', link: '/Engineering/webpack'},
                    // {text: 'vite', link: '/Engineering/vite.md'},
                    {text: '常用工具', link: '/Engineering/tools.md'},
                ]
            },
            {
                text: '问题总结',
                items: [
                    {text: '部分一', link: '/programResolve/chapter1.md'},
                    {text: '部分二', link: '/programResolve/chapter2.md'},
                    {text: '面试要点', link: '/programResolve/interview.md'},
                ]
            },
        ],
        sidebar: 'auto',//根据文章标题 自动生成侧边栏
        // sidebar: {
        //     /**
        //      * 配置多个侧边栏
        //      */
        //     '/vue/': [
        //         'vue2.0',
        //         'vue3.0',
        //         'vuex',
        //     ],
        //     '/guide/': [
        //         '', // 默认第一项
        //         'guide',
        //         'users'
        //     ],
        //     '/others/': [
        //         // 'sql',
        //         // 'flutter',
        //         {
        //             title: 'sql',
        //             path: 'sql'
        //         },
        //         {
        //             title: 'flutter',
        //             path: 'flutter'
        //         },
        //     ],
        //     '/deep/': [
        //         // '',
        //         // 'one',
        //         // 'two',
        //         // 'three',
        //         {
        //             title: 'js基础',
        //             path: 'one'
        //         },
        //         {
        //             title: 'vue',
        //             path: 'two'
        //         },
        //         {
        //             title: 'react',
        //             path: 'three'
        //         },
        //     ],
        //     '/': [
        //             // {
        //             //     title: '欢迎学习',
        //             //     path: '/',
        //             //     collapsable: false, // 不折叠
        //             //     children: [
        //             //         { title: "学前必读", path: "/" }
        //             //     ]
        //             // },
        //             // {
        //             //     title: "基础学习",
        //             //     path: '/handbook/ConditionalTypes',
        //             //     collapsable: false, // 不折叠
        //             //     children: [
        //             //         { title: "条件类型", path: "/handbook/ConditionalTypes" },
        //             //         { title: "泛型", path: "/handbook/Generics" }
        //             //     ]
        //             // }
        //     ]
        // }

    },
}
function genSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'getting-started',
                'customize',
                'advanced',
            ]
        }
    ]
}