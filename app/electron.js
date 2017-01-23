'use strict'

const electron = require('electron')
const path = require('path')
// const app = electron.app
const BrowserWindow = electron.BrowserWindow
const menubar = require('menubar')

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

process.env.URL = config.url;
process.env.YUNBA_APP_KEY = '570fbf534407a3cd028adc5a';

const app = menubar({
  icon: path.join(__dirname, '/icons/ic_menubar.png'),
  index: config.url + '/#/tray',
  width: 400,
  height: 320,
  preloadWindow: true,
  hasShadow: false,
  transparent: true,
  showDockIcon: true,
  webPreferences: {
    webSecurity: false
  }
});

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 400,
    height: 320,
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
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
