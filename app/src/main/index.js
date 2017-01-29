'use strict'

require('dotenv').config();
import path from 'path';
import { BrowserWindow } from 'electron';

const menubar = require('menubar');

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`;

process.env.URL = winURL;
process.env.YUNBA_APP_KEY = '570fbf534407a3cd028adc5a';

const mb = menubar({
  icon: path.join(__dirname, '../../icons/ic_menubar.png'),
  index: winURL + '/#/tray',
  width: 400,
  height: 300,
  preloadWindow: true,
  hasShadow: false,
  transparent: true,
  showDockIcon: false,
  webPreferences: {
    webSecurity: false
  }
});

const app = mb.app;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // eslint-disable-next-line no-console
  console.log('mainWindow opened');
}

app.on('ready', () => {
  // createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    // createWindow();
  }
});
