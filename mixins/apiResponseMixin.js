import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import merge from "deepmerge";

export default {
  computed: {
    apiErrors() {
      if (this.$store) {
        return JSON.parse(JSON.stringify(this.$store.state.apiErrors));
      }
    }
  },
  watch: {
    apiErrors(val) {
      if (val && val.length > 0) {
        // let localFormValidation = JSON.parse(
        //   JSON.stringify(this.formValidation)
        // );
        //
        // console.log('wtf', JSON.stringify(this.formValidation));
        // console.log(localFormValidation);

        // console.log(merge({a: 'a'}, {b: 'b'}));
        //
        // let mergedValidation = merge(this.formValidation, {
        //   email: { minLength: minLength(20) }
        // });

        //console.log('wtf2', mergedValidation);
        //
        let localFormValidation = {};
        console.log(val);
        // for (let error of val.errors) {
        //   console.log(error);
        //   if (error.source && error.source.parameter) {
        //       localFormValidation[error.source.parameter] = { minLength: minLength(20) }
        //   }
        // }
        // console.log(localFormValidation);
        this.formValidation = Object.assign(
          {},
          merge(this.formValidation, localFormValidation)
        );

        //this.$v.email.$touch();
      }
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
