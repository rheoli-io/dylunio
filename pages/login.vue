<template>
  <div>
    <form>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      />
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      />

      <v-btn @click="submit">submit</v-btn>
    </form>
  </div>
</template>

<script>
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  validations: {
    email: { required, email },
    password: { required }
  },

  data: () => ({
    email: "",
    password: ""
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    }
  },

  methods: {
    async submit() {
      return this.$auth
        .login({
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
