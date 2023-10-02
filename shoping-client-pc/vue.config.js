const path = require('path')
const { config } = require('process')
const mySetting = require('./.my_settings')
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: mySetting.myUrl,
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.scss'),
        path.join(__dirname, './src/assets/styles/variables.scss')
      ]
    }
  },
  chainWebpack: config => {
    // 图片加载
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
    config.devServer.disableHostCheck(true)
    // 开启IP域名访问
    config.devServer.disableHostCheck(true)
  },
  configureWebpack: {
    externals: {
      xx: 'QC'
    }
  }
}
