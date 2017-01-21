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
          <a v-if="need_update" class="js-external-link" href="https://github.com/lijy91/daocloud-plus/blob/master/CHANGELOGS.md"><i class="star icon"></i>新版本</a>
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
            <router-link to="/tray/build-flows" class="item">代码构建</router-link>
            <router-link to="/tray/apps" class="item">应用列表</router-link>
          </div>
        </div>
        <div class="column">
        </div>
        <div class="left floated right aligned column">
          <a><i class="large setting icon"></i></a>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  components: {
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
  height: 35px;
  line-height: 35px;
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
</style>
