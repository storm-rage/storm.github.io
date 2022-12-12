module.exports = {
    publicPath: '/',
    title: 'Hello robot',
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: "/robot.gif" }],  //浏览器的标签栏的网页图标
    ],
    base: "/storm.github.io/",//部署时才需要放开
    dest: "./dist",//部署时才需要放开
    themeConfig: {
        logo: "/robot.gif",
        //搜索结果数量
        searchMaxSuggestions: 10,
        nav: [
            //页面路由默认读取目录下的readme.md
            { text: 'Home', link: '/' },
            { text: 'Vue', link: '/vue/',
                items: [
                    {text: 'vue2.0', link: '/vue/vue2.0.md'},
                    {text: 'vue3.0', link: '/vue/vue3.0.md'},
                    {text: 'vuex', link: '/vue/vuex.md'},
                ]
            },
            { text: 'Guide', link: '/guide/guide.md' },
            { text: 'Others', link: '/others/' ,
                items: [
                    {text: 'sql', link: '/others/sql.md'},
                    {text: 'flutter', link: '/others/flutter.md'},
                ]
            },
            { text: '深度学习',
                items: [
                    {text: 'js基础', link: '/deep/one.md'},
                    {text: 'vue', link: '/deep/two.md'},
                    {text: 'react', link: '/deep/three.md'}
                ]
            }
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