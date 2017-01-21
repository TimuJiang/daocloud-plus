<template>
  <div>
    <div class="ui active inverted dimmer" v-if="lists === null || lists.lenght === 0">
      <div class="ui medium text loader"></div>
    </div>
    <div class="ui relaxed divided list">
      <div class="item" v-for="item in lists">
        <div class="right floated content">
          {{ item.created_at | moment }}
        </div>
        <i class="big middle aligned icon" v-bind:class="item.src_provider"></i>
        <div class="content">
          <a class="header js-external-link" :href="`https://dashboard.daocloud.io/build-flows/${item.id}`">{{item.name}}</a>
          <div class="description">
             {{item.status}}
          </div>
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
    lists: state => state.daocloudplus.buildFlows.lists,
  }),
  mounted() {
    this.$store.dispatch('getBuildFlowLists');
  },
};
</script>

<style lnag="scss" scoped>
</style>
