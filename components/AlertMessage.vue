<template>
  <div>
    <template v-for="(messages, messageType) in alertMessages">
      <v-alert
        v-for="(message, index) in messages"
        v-bind:key="index"
        :value="true"
        :type="messageType"
      >
        {{ message }}
      </v-alert>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alertMessages: null
    };
  },
  mounted() {
    if (this.$store.state.alertMessages) {
      this.alertMessages = this.$store.state.alertMessages;
      this.$store.commit("clearAlertMessages");
    }
  }
};
</script>
