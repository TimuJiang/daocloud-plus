<template>
  <div class="ui container">
    <h1 class="ui header">设置</h1>
    <form class="ui form success" novalidate @submit.prevent="submit()">
      <div class="required field">
        <label>API Token</label>
        <input
          type="text"
          name="access_token"
          placeholder=""
          v-model="params.accessToken">
      </div>
      <div class="field">
        <label>Webhook</label>
        <input
          type="text"
          name="webhook"
          placeholder=""
          readonly=""
          v-model="webhookUrl">
      </div>
      <div class="ui success message" v-if="success">
        <p>保存成功</p>
      </div>
      <button class="ui primary button" type="submit">保存</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      rules: {
      },
      params: {
        accessToken: '',
      },
      success: false,
    };
  },
  computed: mapState({
    auth: state => state.account.auth,
    webhookUrl() {
      return `https://daocloud-plus.thecode.me/${this.auth.alias}`;
    },
  }),
  methods: {
    submit() {
      this.$store.dispatch('accountSettingsSubmit', this.params);
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
    },
  },
  mounted() {
    this.$store.dispatch('accountSettingsInit');

    this.params.accessToken = this.auth.access_token;
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
  .header {
    margin-bottom: 30px;
  }
}
</style>
