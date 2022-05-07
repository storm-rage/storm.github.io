module.exports = {
    publicPath: '/',
    title: 'Hello VuePress999',
    description: 'Just playing around',
    base: "/",
    dest: "./dist",
    themeConfig: {
        //搜索结果数量
        searchMaxSuggestions: 10,
        nav: [
            //页面路由默认读取目录下的readme.md
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Others', link: '/others/' ,
                items: [
                    {text: 'sql', link: '/others/sql'},
                    {text: 'flutter', link: '/others/flutter'},
                ]
            },
            { text: '深度学习',
                items: [
                    {text: 'js基础', link: '/deep/one'},
                    {text: 'vue', link: '/deep/two'},
                    {text: 'react', link: '/deep/three'}
                ]
            }
        ],
        sidebar: {
            /**
             * 配置多个侧边栏
             */
            '/guide/': [
                '', // 默认第一项
                'guide',
                'users'
            ],
            '/others/': [
                // 'sql',
                // 'flutter',
                {
                    title: 'sql',
                    path: 'sql'
                },
                {
                    title: 'flutter',
                    path: 'flutter'
                },
            ],
            '/deep/': [
                // '',
                // 'one',
                // 'two',
                // 'three',
                {
                    title: 'js基础',
                    path: 'one'
                },
                {
                    title: 'vue',
                    path: 'two'
                },
                {
                    title: 'react',
                    path: 'three'
                },
            ],
            '/': [
                    {
                        title: '欢迎学习',
                        path: '/',
                        collapsable: false, // 不折叠
                        children: [
                            { title: "学前必读", path: "/" }
                        ]
                    },
                    {
                        title: "基础学习",
                        path: '/handbook/ConditionalTypes',
                        collapsable: false, // 不折叠
                        children: [
                            { title: "条件类型", path: "/handbook/ConditionalTypes" },
                            { title: "泛型", path: "/handbook/Generics" }
                        ]
                    }
            ]
        }

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