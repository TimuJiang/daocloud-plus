<template>
  <div>
    <div class="ui relaxed divided list">
      <div class="ui active inverted dimmer" v-if="error === null && (lists === null || lists.length === 0)">
        <div class="ui medium text loader"></div>
      </div>
      <div class="ui basic segment" v-if="error && error.code !== 0">
        <label>
          {{error.code}} : {{error.message}}
        </label>
        <br>
        <label>
          <a v-on:click="clickSettings">配置API Token</i></a> 并 <a v-on:click="retry">重试</i></a>
        </label>
      </div>
      <div class="item" v-for="item in lists">
        <div class="right floated">
          {{ item.created_at | moment }}
        </div>
        <i class="big middle aligned icon" v-bind:class="item.src_provider"></i>
        <div class="content">
          <a class="header js-external-link" :href="`https://dashboard.daocloud.io/build-flows/${item.id}`">{{item.name}}</a>
          <div class="description">
             <label class="status" v-bind:class="item.status">{{$t(`buildStatus.${item.status}`)}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import electron from 'electron';
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

export default {
  components: {
  },
  computed: mapState({
    error: state => state.daocloudplus.buildFlows.error,
    lists: state => state.daocloudplus.buildFlows.lists,
  }),
  methods: {
    retry() {
      this.$store.dispatch('getBuildFlowLists');
    },
    clickSettings() {
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
  mounted() {
    this.retry();
  },
};
</script>

<style lang="scss" scoped>
.content {
  .header {
    color: #3890ff;
  }
  .description {
    padding-top: 5px;
  }
}
// 状态
.status {
  font-size: 12px;
}
.Pending{
  color:#f6bb42;
}
.Started{
  color:#4fc1e9;
}
.Success{
  color:#2ecc71;
}
.Error,.Killed,.Timeout{
  color:#ed5565;
}
.Inactive{
  color:#aab2bd;
}
.Active{
  color:#2ecc71;
}
.Cancelled{
  color:#aab2bd;
}
.Failure{
  color:#ed5565;
}

</style>
