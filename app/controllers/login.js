"use strict";

const path = require('path');
const {BrowserWindow} = require('electron');

class LoginWindow {
  constructor() {
    this.window = null;
  }

  init() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      allowRunningInsecureContent: true,
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }

  show() {
    if (this.window == null) {
      this.init();
    }
    this.window.loadURL('file://' + path.join(__dirname, '/../views/login.html'));
    this.window.show();
  }
}

module.exports = LoginWindow;
