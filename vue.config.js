module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const overrides = {
        output: {
          publicPath: ''
        }
      }
      return overrides
    }
  }
}
