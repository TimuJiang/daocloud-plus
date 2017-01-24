<template>
  <div class="ui container">
    <h1 class="ui header">设置</h1>
    <form class="ui form error" novalidate @submit.prevent="submit()">
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
    };
  },
  computed: mapState({
    auth: state => state.account.auth,
    webhookUrl() {
      return `https://daocloud-plus.daza.io/${this.auth.alias}`;
    },
  }),
  methods: {
    submit() {
      this.$store.dispatch('accountSettingsSubmit', this.params);
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
