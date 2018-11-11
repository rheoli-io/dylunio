<template>
  <v-app>
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <font-awesome-icon icon="tasks" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title> tickets </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-3" dark app :clipped-left="$vuetify.breakpoint.lgAndUp" fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer;" />
      <v-toolbar-title class="white--text">Ryoli</v-toolbar-title>
      <v-spacer />
      <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down" />
      <v-spacer />
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu>
        <v-btn color="primary" dark slot="activator">
          <font-awesome-icon icon="bars" />
        </v-btn>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null
  }),
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$router.go();
      });
    }
  }
};
</script>
