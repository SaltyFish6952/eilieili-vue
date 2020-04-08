module.exports = {

    pages: {
        index: {
            // page 的入口
            entry: 'src/pages/main/index.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/main.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        video: {
            entry: 'src/pages/video/index.js',
            template: 'public/index.html',
            filename: 'video',
            title: 'HHHHHHHHHHHHHHHH',
            chunks: ['chunk-vendors', 'chunk-common', 'video']
        },
        login: {
            entry: 'src/pages/login/login.js',
            template: 'public/index.html',
            filename: 'login',
            title: 'loginPage',
            chunks: ['chunk-vendors', 'chunk-common', 'login']
        }

    }
}
