const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const devConfig = require('../webpack.dev.js')

const compiler = webpack(devConfig)
const devServerOptions = { ...devConfig.devServer, open: false }
const server = new WebpackDevServer(devServerOptions, compiler)

server.startCallback((err) => {
  if (err) {
    return
  }
  if (process.send) {
    process.send('ok')
  }
})
