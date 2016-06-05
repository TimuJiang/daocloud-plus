/**
 * Copyright (C) 2015 JianyingLi <lijy91@foxmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const path = require('path');
const electron = require('electron');
const menubar = require('menubar');
const Vue = require('vue');

class AppTray {

  constructor() {
    this.menubar = null;
    this.init();
  }

  init() {
    this.menubar = menubar({
      icon: path.join(__dirname, '/../images/ic_menubar.png'),
      index: 'file://' + path.join(__dirname, '/../views/app_tray.html'),
      width: 350,
      height: 290,
      preloadWindow: true,
      hasShadow: false,
      transparent: true
    });

    this.menubar.on('ready', () => {
      // Open the DevTools.
      this.menubar.window.webContents.openDevTools();

      this.menubar.window.on('closed', () => {
        // 退出程序
        this.menubar.app.quit();
      });
    });
  }
}

module.exports = AppTray;
