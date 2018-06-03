<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-form @submit.prevent="handleSubmit">
      <v-card-text>
        <v-text-field
          prepend-icon="email"
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        />
        <v-text-field
          prepend-icon="lock"
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          color="primary">Login</v-btn>
        <v-btn
          flat
          to="register">Register</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  layout: "anonymous",

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
    handleSubmit() {
      this.$v.$touch();

      if (this.$v.invalid) {
        return false;
      }

      this.$auth
        .loginWith("local", {
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
