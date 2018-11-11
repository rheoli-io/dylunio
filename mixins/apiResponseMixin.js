export default {
  computed: {
    apiErrors() {
      if (this.$store) {
        return JSON.parse(JSON.stringify(this.$store.state.apiErrors));
      }
    },
    hasGenericErrors() {
      if (this.apiErrors.hasOwnProperty("generic")) {
        return true;
      }

      return false;
    },
    genericErrors() {
      const errors = [];

      if (this.apiErrors.hasOwnProperty("generic")) {
        this.$store.commit("deleteApiError", "generic");
        for (let apiError of this.apiErrors.generic) {
          errors.push(apiError);
        }
      }

      return errors.join("<br>");
    }
  },
  methods: {
    parseErrorMessage(errors) {
      let parsedErrors = {};

      for (let error of errors) {
        let errorType = "generic";

        if (error.source && error.source.parameter) {
          errorType = error.source.parameter;
        }

        if (typeof parsedErrors[errorType] === "undefined") {
          parsedErrors[errorType] = [];
        }

        parsedErrors[errorType].push(error.detail);
      }

      return parsedErrors;
    }
  }
};
