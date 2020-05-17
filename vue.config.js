module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8088',
                changeOrigin: true,
                ws: true
            }
        }
    },

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
            title: '',
            chunks: ['chunk-vendors', 'chunk-common', 'video']
        },
        home: {
            entry: 'src/pages/home/index.js',
            template: 'public/index.html',
            filename: 'home',
            title: 'home',
            chunks: ['chunk-vendors', 'chunk-common', 'home']
        },
        upload: {
            entry: 'src/pages/upload/index.js',
            template: 'public/index.html',
            filename: 'upload',
            title: 'upload',
            chunks: ['chunk-vendors', 'chunk-common', 'upload']
        },
        admin: {
            entry: 'src/pages/admin/index.js',
            template: 'public/index.html',
            filename: 'admin',
            title: '管理控制台',
            chunks: ['chunk-vendors', 'chunk-common', 'admin']
        },
        dynamic:{
            entry: 'src/pages/dynamic/index.js',
            template: 'public/index.html',
            filename: 'dynamic',
            title: 'dynamic',
            chunks: ['chunk-vendors', 'chunk-common', 'dynamic']
        }


    }
}
