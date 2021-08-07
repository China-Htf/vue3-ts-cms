module.exports = {
  plugins: [
    [
      'import',
      {
        // 从该库引入东西时
        libraryName: 'element-plus',
        customStyleName: name => {
          // 引入相应的 css 文件
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
