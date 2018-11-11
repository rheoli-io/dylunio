<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
    <v-alert v-model="hasGenericErrors" type="error">
      <span v-html="genericErrors"></span>
    </v-alert>
    <v-form @submit.prevent="handleSubmit">
      <v-card-text>
        <v-text-field prepend-icon="person" v-model="username" :error-messages="usernameErrors" label="Username" required @input="$v.username.$touch()" @blur="$v.username.$touch()" />
        <v-text-field prepend-icon="email" v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()" />
        <v-text-field prepend-icon="lock" v-model="password" :error-messages="passwordErrors" label="Password" required @input="$v.password.$touch()" @blur="$v.password.$touch()" type="password" />
        <v-text-field prepend-icon="lock" v-model="passwordConfirm" :error-messages="passwordConfirmErrors" label="Password Confirm" required @input="$v.password.$touch()" @blur="$v.password.$touch()" type="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="primary">Register</v-btn>
        <v-btn flat to="login">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

import apiResponse from "../mixins/apiResponseMixin";

export default {
  layout: "anonymous",
  auth: false,

  mixins: [apiResponse],

  validations() {
    return this.formValidation;
  },

mounted() {
    this.$store.commit(
          "FLASH/SET_FLASH",
          { message: "some message 123 321", variant: "success" }
        );

        this.$router.push('/login');
  },


  data: () => ({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    formValidation: {
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      passwordConfirm: { required, sameAsPassword: sameAs("password") }
    }
  }),

  computed: {
    usernameErrors() {
      const errors = [];

      if (this.apiErrors.hasOwnProperty("username")) {
        this.$store.commit("deleteApiError", "username");
        for (let apiError of this.apiErrors.username) {
          errors.push(apiError);
        }
      }

      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");

      return errors;
    },
    emailErrors() {
      const errors = [];

      if (this.apiErrors.hasOwnProperty("email")) {
        this.$store.commit("deleteApiError", "email");
        for (let apiError of this.apiErrors.email) {
          errors.push(apiError);
        }
      }

      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (this.apiErrors.hasOwnProperty("password")) {
        this.$store.commit("deleteApiError", "password");
        for (let apiError of this.apiErrors.password) {
          errors.push(apiError);
        }
      }

      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("The password must be at least 8 characters long.");

      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];

      if (this.apiErrors.hasOwnProperty("passwordconfirm")) {
        this.$store.commit("deleteApiError", "passwordconfirm");
        for (let apiError of this.apiErrors.passwordconfirm) {
          errors.push(apiError);
        }
      }

      if (!this.$v.passwordConfirm.$dirty) return errors;
      !this.$v.passwordConfirm.required && errors.push("Password is required");
      return errors;
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      this.$store
        .dispatch("users/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        })
        .then(response => {
          if (response) {
            this.$store.commit(
          "FLASH/SET_FLASH",
          { message: "some message 123", variant: "success" }
        );
            this.$router.push({ path: "/login" });
          }
        });
    }
  }
};
</script>
