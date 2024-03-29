module.exports = {
    base: '/front-end-specification/',
    title: '前端规范',
    head: [
        ['meta', { name: 'referrer', content: 'no-referrer' }],
    ],
    themeConfig: {
        nav: [
            {
                text: '前端规范',
                items: [
                    { text: 'JavaScript 编码规范', link: '/js' },
                    { text: 'TypeScript 编码规范', link: '/ts' },
                    { text: 'CSS 编码规范', link: '/css' },
                    { text: 'HTML 编码规范', link: '/html' },
                    { text: 'Vue 编码规范', link: '/vue' },
                    { text: 'Git 规范', link: '/git' },
                    { text: 'Code Review 规范', link: '/codereview' },
                    { text: '移动端适配规范', link: '/mobile' },
                    { text: '文件命名规范', link: '/file' },
                    { text: '规范验证与代码格式化', link: '/verify' },
                    { text: '用户体验', link: '/ue' },
                    { text: '其他', link: '/other' },
                ]
            }
        ],
        sidebar: [
            ['/', '简介'],
            ['/js', 'JavaScript 编码规范'],
            ['/ts', 'TypeScript 编码规范'],
            ['/css', 'CSS 编码规范'],
            ['/html', 'HTML 编码规范'],
            ['/vue', 'Vue 编码规范'],
            ['/git', 'Git 规范'],
            ['/codereview', 'Code Review 规范'],
            ['/mobile', '移动端适配规范'],
            ['/file', '文件命名规范'],
            ['/verify', '规范验证与代码格式化'],
            ['/ue', '用户体验'],
            ['/other', '其他'],
        ],
        repo: 'https://github.com/woai3c/front-end-specification',
        repoLabel: '给作者的 Github 点个 star 吧！',
        displayAllHeaders: true,
        smoothScroll: true,
    }
}