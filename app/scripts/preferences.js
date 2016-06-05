"use strict";

class PreferencesWindow {
  constructor(splashWindow, wechatWindow) {
    let image;
     if (process.platform == "linux") {
       image = nativeImage.createFromPath(path.join(__dirname, '../../../assets/status_bar_linux.png'));
     } else {
       image = nativeImage.createFromPath(path.join(__dirname, '../../../assets/status_bar.png'));
     }
  }
}

module.exports = PreferencesWindow;
