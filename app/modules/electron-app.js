import { app, BrowserWindow } from 'electron';
import path from "path";

// global reference to prevent the window to be closed after garbage collection.
let mainWindow

const createBrowserWindow = props => {
  const { width, height, indexFilePath } = props

  // Create the browser window.
  let browserWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  browserWindow.loadURL(indexFilePath)

  // Open the DevTools. 
  if (process.env.NODE_ENV === 'development') {
    browserWindow.webContents.openDevTools()
  }

  browserWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    browserWindow = null
  })

  return browserWindow
}


const createElectronApp = props => {

  const { width = 800,
          height = 600,
          indexFilePath = 'app/index.html' 
        } = props || {}

  app.on('ready', () => {
    mainWindow = createBrowserWindow({width, height, indexFilePath})
  })

  app.on('window-all-closed', function () {
    mainWindow = null
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', function () {
    if (mainWindow === null) {
      mainWindow = createBrowserWindow({width, height, indexFilePath})
    }
  })

  return app
}

export {createElectronApp}