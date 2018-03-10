module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "dylunio",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js + Vuetify.js project"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },
  css: ["~/assets/style/app.styl"],
  plugins: ["~/plugins/vuelidate", "~/plugins/auth"],
  modules: ["@nuxtjs/auth", "@nuxtjs/axios", "@nuxtjs/vuetify"],
  router: {
    middleware: ["auth"]
  },
  auth: {
    endpoints: {
      login: {
        url: "http://localhost:5000/api/v1/users/login",
        method: "post",
        propertyName: "token"
      },
      logout: {
        url: "http://localhost:5000/api/v1/users/logout",
        method: "post"
      },
      user: {
        url: "http://localhost:5000/api/v1/users",
        method: "get",
        propertyName: "user"
      }
    },
    fetchUserOnLogin: true,
    watchLoggedIn: true
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    vendor: ["axios"],
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          // enforce: 'pre',
          // test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          // exclude: /(node_modules)/
        });
      }
    }
  }
};
