<template>
  <v-app dark>
    <v-content>
      <v-container>
         <alert-message></alert-message>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// disabled until https://github.com/nuxt/nuxt.js/issues/3764 is fixed
import AlertMessage from "~/components/AlertMessage.vue";

export default {
  components: {
    AlertMessage
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  watch: {
    isLoading(val) {
      if (val === true) {
        this.$nuxt.$loading.start();
      } else {
        this.$nuxt.$loading.finish();
      }
    }
  }
};
</script>
