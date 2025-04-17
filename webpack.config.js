module.exports = {
  // ... autres configurations
  node: {
    __dirname: true,
  },
  externals: {
    'zlib-sync': 'commonjs zlib-sync'
  }
}; 