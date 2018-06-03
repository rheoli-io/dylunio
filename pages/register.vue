<template>
  <v-content>
    <v-card class="elevation-12">
      <v-toolbar
        dark
        color="primary">
        <v-toolbar-title>Register</v-toolbar-title>
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
          <v-text-field
            prepend-icon="lock"
            v-model="passwordConfirm"
            :error-messages="passwordConfirmErrors"
            label="Password Confirm"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            type="password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            color="primary">Register</v-btn>
          <v-btn
            flat
            to="login">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-content>
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

  data: () => ({
    email: "",
    password: "",
    passwordConfirm: "",
    formValidation: {
      email: { required: required, email },
      password: { required },
      passwordConfirm: { required, sameAsPassword: sameAs("password") }
    }
  }),

  computed: {
    emailErrors() {
      const errors = [];

      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");

      if (! this.$v.email.minLength && typeof this.$v.email.minLength !== "undefined") {
        errors.push("minLength");
      }

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.passwordConfirm.$dirty) return errors;
      !this.$v.passwordConfirm.required && errors.push("Password is required");
      return errors;
    }
  },

  methods: {
    handleSubmit() {
      this.$v.$touch();

      if (this.$v.invalid) {
        return false;
      }

      this.$store.dispatch("users/register", {
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      });
    }
  },

  mounted() {
    //this.formValidation.email.minLength = minLength(100);
  }
};
</script>
