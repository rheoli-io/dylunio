<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <alert-message></alert-message>
    <v-form @submit.prevent="handleSubmit">
      <v-card-text>
        <v-text-field
          v-model="email"
          prepend-icon="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          type="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="primary">Login</v-btn>
        <v-btn flat to="register">Register</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import HttpStatus from "http-status-codes";
import AlertMessage from "~/components/AlertMessage.vue";

export default {
  layout: "anonymous",
  auth: false,

  components: {
    AlertMessage
  },

  validations: {
    email: { required, email },
    password: { required }
  },

  data: () => ({
    email: "",
    password: "",
    genericErrors: {}
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
    },
    hasGenericErrors() {
      if (this.genericErrors.length > 0) {
        return true;
      }

      return false;
    },
    registered() {
      return this.$store.state.users.registered;
    }
  },

  methods: {
    handleSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(e => {
          if (
            e.response &&
            e.response.status &&
            e.response.status === HttpStatus.UNAUTHORIZED
          ) {
            this.genericErrors = "Invalid Login";
          } else {
            this.genericErrors = "Unknown server error";
          }
        });
    }
  }
};
</script>
