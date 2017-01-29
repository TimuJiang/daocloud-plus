'use strict'

import dotenv from 'dotenv';
import path from 'path';
import { BrowserWindow } from 'electron';
import menubar from 'menubar';

dotenv.config({ path: '../../.env' });

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
    width: 400,
    height: 324,
    center: true,
    // alwaysOnTop: true,
    // showDockIcon: true,
    // titleBarStyle: 'hidden',
    // minimizable: false,
    // maximizable: false,
    webPreferences: {
      webSecurity: false,
    },
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
