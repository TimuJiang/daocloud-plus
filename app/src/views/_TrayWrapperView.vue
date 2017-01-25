<template>
  <section>
    <header>
      <div class="ui equal width padded grid" onselectstart="return false;">
        <div class="right floated left aligned column">
          <a class="js-external-link" href="https://www.daocloud.io"><i class="large world icon"></i></a>
        </div>
        <div class="eight wide center aligned column">
          <h4 class="title" style="cursor:default;">DaoCloud+</h4>
        </div>
        <div class="left floated right aligned column">
          <a v-if="socketConnected" class="ui green label">在线</a>
          <a v-if="!socketConnected" class="ui grey label">离线</a>
          <a v-if="hasNewVersion" class="js-external-link has-new-version" href="https://github.com/lijy91/daocloud-plus/releases"><i class="star icon"></i>新版本</a>
        </div>
      </div>
    </header>
    <div class="ui basic list segment">
      <router-view></router-view>
    </div>
    <footer>
      <div class="ui equal width padded grid" onselectstart="return false;">
        <div class="eight wide column">
          <div class="ui secondary menu">
            <router-link to="/tray/build-flows" class="item">项目</router-link>
            <router-link to="/tray/apps" class="item">应用列表</router-link>
          </div>
        </div>
        <div class="column">
        </div>
        <div class="left floated right aligned column">
          <a v-on:click="clickSettings"><i class="large setting icon"></i></a>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import shortid from 'shortid';
import electron from 'electron';
import io from 'socket.io-client';

const JSON = global.JSON;
const version = require('../../package.json').version;
const shell = electron.shell;
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const Menu = remote.Menu;
const ipcRenderer = electron.ipcRenderer;

export default {
  components: {
  },
  data() {
    return {
      hasNewVersion: false,
      socketConnected: false,
      socketError: null,
    };
  },
  computed: mapState({
    auth: state => state.account.auth,
  }),
  methods: {
    checkNewVersion() {
      this.$http.get('https://raw.githubusercontent.com/lijy91/daocloud-plus/master/app/package.json').then(response => {
        const data = JSON.parse(response.data);
        if (data.version > version) {
          this.hasNewVersion = true;
        }
      });
    },
    clickSettings() {
      // 首选项
      // 意见反馈
      // --------
      // 退出
      const template = [
        {
          label: '首选项',
          click() {
            const window = new BrowserWindow({
              width: 400,
              height: 520,
              show: false,
              resizable: false,
              alwaysOnTop: true,
              titleBarStyle: 'hidden',
              minimizable: false,
              maximizable: false,
            });
            window.loadURL(`${process.env.URL}/#/account/settings`);
            window.show();

            if (process.env.NODE_ENV === 'development') {
              window.webContents.openDevTools();
            }
          },
        },
        {
          type: 'separator',
        },
        {
          label: '获取源码',
          click: () => {
            shell.openExternal('https://github.com/lijy91/daocloud-plus');
          },
        },
        {
          label: '意见反馈',
          click: () => {
            shell.openExternal('https://github.com/lijy91/daocloud-plus/issues/new');
          },
        },
        {
          type: 'separator',
        },
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ];

      const menu = Menu.buildFromTemplate(template);
      menu.popup(remote.getCurrentWindow());
    },
  },
  mounted() {
    this.checkNewVersion();
    let yunbaAlias = localStorage.getItem('auth.alias');
    if (!yunbaAlias) {
      yunbaAlias = shortid.generate();
      localStorage.setItem('auth.alias', yunbaAlias);
    }
    const socket = io.connect('http://sock.yunba.io:3000', { forceNew: true, secure: true });
    // 初始化回调
    socket.on('connect', () => {
      // 进行确认身份
      socket.emit('connect_v2', {
        appkey: process.env.YUNBA_APP_KEY,
        customid: yunbaAlias,
      });
    });
    // 确认身份回调
    socket.on('connack', (data) => {
      if (!data.success) {
        return;
      }
      this.socketConnected = true;
      // 进行设置别名
      socket.emit('set_alias', {
        alias: yunbaAlias,
      });
    });
    // 设置别名回调
    socket.on('set_alias_ack', (data) => {
      if (!data.success) {
        return;
      }
    });
    // 消息接收回调
    socket.on('message', (data) => {
      ipcRenderer.send('asynchronous-message', data.msg);
    });
    // 断开连接回调
    socket.on('disconnect', () => {
      this.socketConnected = false;
    });
    // 错误
    socket.on('error', (error) => {
      this.socketError = error;
    });
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #fff;
  margin: 10px 13px 13px 13px;
  padding: 9px;
  border-radius: 7px;
  border: 1px solid #A9A9A9;
  position: relative;
}
section::after, section::before {
  position: absolute;
  content: '';
  display: block;
  width: 0;
  height: 0;
}
section::before {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #A9A9A9;
  top: -10px;
  left: calc(50% - 11px);
}
section::after {
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 9px solid #fff;
  top: -9px;
  left: calc(50% - 10px);
}
header {
  color: #555555;
  height: 40px;
  line-height: 36px;
  margin: -9px -9px 0px -9px;
  background: linear-gradient(180deg, #fff, #E9E9E9);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  border-bottom: 1px solid #adadad;
  padding-left: 12px;
  padding-right: 12px;
}
header > .ui.grid > .column:not(.row) {
  padding: 0em;
}
header > .ui.grid > .column > .title {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
}
footer {
  font-size: 13px;
  color: #555555;
  height: 40px;
  line-height: 36px;
  margin: 0px -9px -9px -9px;
  background: linear-gradient(180deg, #fff, #E9E9E9);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-top: 1px solid #adadad;
  padding-left: 12px;
  padding-right: 12px;
}
footer > .ui.grid > .column:not(.row) {
  padding: 0em;
}
header a, footer a {
  color: #767676;
  font-size: 12px;
}
header a:hover, footer a:hover {
  color: #232323;
}
.ui.segment {
  margin: 0em;
  padding: 0em;
}
.ui.list.segment {
  overflow-y: auto;
  white-space: nowrap;
  min-height: 200px;
  max-height: 200px;
  margin-right: -9px;
  padding-right: 9px;
}
.has-new-version {
  color: #ed5565;
}
</style>
