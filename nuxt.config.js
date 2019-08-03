const pkg = require("./package");
const config = require("config");
const webpack = require("webpack");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
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

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3B8070" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify",
    "~/plugins/vuelidate",
    "~/plugins/fontawesome",
    "~/plugins/axios"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/auth",
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "@/modules/api"
  ],
  router: {
    middleware: ["auth"]
  },
  auth: {
    resetOnError: true,
    strategies: {
      local: {
        _scheme: "~/plugins/authScheme.js",
        endpoints: {
          login: {
            url: config.get("backend.url") + "users/login",
            method: "post",
            propertyName: "token",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          },
          logout: {
            url: config.get("backend.url") + "users/logout",
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          },
          user: {
            url: config.get("backend.url") + "users",
            method: "get",
            propertyName: "user",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        }
      }
    }
  },
  /*
   ** Axios module configuration
   */
  axios: {
    prefix: "/api",
    credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          // enforce: "pre",
          // test: /\.(js|vue)$/,
          // loader: "eslint-loader",
          // exclude: /(node_modules)/
        });
      }
    },
    plugins: [new webpack.DefinePlugin({ CONFIG: JSON.stringify(config) })]
  }
};
