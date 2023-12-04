const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    //https: true,
    //host: 'localhost',
    allowedHosts: 'all',
    // 如果需要，您还可以添加其他devServer配置项，例如port、proxy等。
  }
});
