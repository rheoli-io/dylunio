<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
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
