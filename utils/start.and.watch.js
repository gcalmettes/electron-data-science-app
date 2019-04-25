import chokidar from 'chokidar';
import path from "path"

import { startPythonAPI } from './../app/modules/python-server.js'
import { configPython } from './app.config.js'


// start electron app
import { apiConfig, electronApp } from "./../app/main.js";

// Initialize watcher for 
const pyserverFolder = path.resolve(__dirname, './../', configPython.pyPath)
const watcher = chokidar.watch(pyserverFolder, {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

// So we can log when events are received.
const log = console.log.bind(console);

// Add event listeners.
watcher
  .on('add', path => {
    log(`File ${path} has been added`)
    startPythonAPI(apiConfig)
  })
  .on('change', path => {
    log(`File ${path} has been changed`)
    startPythonAPI(apiConfig)
  })
  .on('unlink', path => {
    log(`File ${path} has been removed`)
    startPythonAPI(apiConfig)
  })
  .on('addDir', path => {
    log(`Directory ${path} has been added`)
    startPythonAPI(apiConfig)
  })
  .on('unlinkDir', path => {
    log(`Directory ${path} has been removed`)
    startPythonAPI(apiConfig)
  })
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))