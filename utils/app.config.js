const configElectron = {
  windowWidth: 800,
  windowHeight: 600,
  indexFilePath: './dist/index.html'
}

const configPython = {
  pyPath: './app/pyserver',
  scriptPathDev: './app/pyserver/api.py',
  scriptPathProd: './dist/pyserver/api/api',
  address: '127.0.0.1',
  port: 4242
}

module.exports.configElectron = configElectron
module.exports.configPython = configPython