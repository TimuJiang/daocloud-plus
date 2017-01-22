<template>
  <div class="ui relaxed divided list">
    <div class="ui active inverted dimmer" v-if="lists === null || lists.length === 0">
      <div class="ui medium text loader"></div>
    </div>
    <div class="item" v-for="item in lists">
      <div class="right floated">
        {{ item.last_operated_at | moment }}
      </div>
      <div class="content">
        <a class="header js-external-link" :href="`https://dashboard.daocloud.io/runtime-app/${item.id}`">{{item.name}}</a>
        <div class="description">
          <label class="status" v-bind:class="item.state">{{$t(`appStatus.${item.state}`)}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
  },
  computed: mapState({
    lists: state => state.daocloudplus.apps.lists,
  }),
  mounted() {
    this.$store.dispatch('getAppLists');
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
.running{
  color:#2ecc71;
}
.stopped{
  color:#ed5565;
}
</style>
