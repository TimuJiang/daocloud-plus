<template>
  <div class="ui active inverted dimmer">
      <div class="ui medium text loader"></div>
    </div>
</template>

<script>
export default {
  components: {
  },
  mounted() {
    this.$router.push('/tray/build-flows');
  },
};
</script>

<style lnag="scss" scoped>
</style>
