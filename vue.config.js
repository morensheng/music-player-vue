module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // baseUrl
                target: 'https://musicapi-five.vercel.app/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}