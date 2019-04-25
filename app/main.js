import path from "path"

import { configElectron, configPython } from './../utils/app.config.js'
import { createElectronApp } from './modules/electron-app.js'
import { createClient } from './modules/web-client.js'
import { startPythonAPI, stopPythonAPI } from './modules/python-server.js'

///////////////////////////////
// create electron app
///////////////////////////////

const isDev = (process.env.NODE_ENV === 'development');

const electronApp = createElectronApp({
  width: configElectron.windowWidth,
  height: configElectron.windowHeight,
  indexFilePath: isDev 
    ? "http://localhost:3000" 
    : "file://" + path.join(__dirname, './../', configElectron.indexFilePath)
})

electronApp.on('ready', () => startPythonAPI(apiConfig))
electronApp.on('will-quit', () => stopPythonAPI())

///////////////////////////////
// python api server config
///////////////////////////////


const useFile = (process.env.PYTHON_API === 'file'); // use python file or build

const apiConfig = {
  scriptPath: useFile // use file or build
    ? path.resolve(__dirname, './../', configPython.scriptPathDev)
    : path.resolve(__dirname, './../', configPython.scriptPathProd),
  port: configPython.port,
  useBuild: !useFile
}


export { electronApp }
export { apiConfig }