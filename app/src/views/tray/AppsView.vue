<template>
  <div>
    <div class="ui active inverted dimmer" v-if="lists === null || lists.lenght === 0">
      <div class="ui medium text loader"></div>
    </div>
    <div class="ui relaxed divided list">
      <div class="item" v-for="item in lists">
        <div class="right floated content">
          {{ item.last_operated_at | moment }}
        </div>
        <div class="content">
          <a class="header">{{ item.name }}</a>
          <div class="description">{{ item.state }}</div>
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

<style lnag="scss" scoped>
</style>
