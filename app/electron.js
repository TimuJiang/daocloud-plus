'use strict'

require('dotenv').config();
const electron = require('electron')
const path = require('path')
// const app = electron.app
const BrowserWindow = electron.BrowserWindow
const menubar = require('menubar')

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}?go=`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html?go=`
}

process.env.URL = config.url;

const mb = menubar({
  icon: path.join(__dirname, '/icons/ic_menubar.png'),
  index: config.url + '/#/tray',
  width: 400,
  height: 300,
  preloadWindow: true,
  hasShadow: false,
  transparent: true,
  showDockIcon: true,
  webPreferences: {
    webSecurity: false
  }
});

const app = mb.app;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 400,
    height: 324,
    center: true,
    // alwaysOnTop: true,
    // showDockIcon: true,
    // titleBarStyle: 'hidden',
    // minimizable: false,
    // maximizable: false,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
}

app.on('ready', () => {
  // createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    // createWindow()
  }
})
