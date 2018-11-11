<template>
<div>
  ASD<flash-message variant="success"></flash-message>DSA
            <nuxt/>
</div>
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
}

</script>
