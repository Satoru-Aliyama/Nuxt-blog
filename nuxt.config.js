const bodyParser = require("body-parser");
const axios = require("axios");

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "Blog with NUXT JS" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
      },
      { rel: "stylesheet", href: "https://unpkg.com/ress/dist/ress.min.css" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "green" },
  /*
   ** Global CSS
   */
  css: ["@/assets/styles/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  // modules: ["@nuxtjs/axios"],
  // axios: {
  //   baseUrl: process.env.BASE_URL || "https://nuxt-blog-f6af5.firebaseio.com"
  // },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  env: {
    baseUrl:
      process.env.BASE_URL || "https://nuxt-blog-f6af5.firebaseio.com/posts/",
    fbAPIKey: "AIzaSyB2uJEivohgMj38-MyoRBNCeCeUzSNerjg"
  },

  transition: {
    name: "page",
    mode: "out-in"
  },

  plugins: ["@/plugins/core-components.js", "@/plugins/date-filter.js"],

  serverMiddleware: [bodyParser.json(), "~/api"],

  generate: {
    routes: function() {
      return axios
        .get("https://nuxt-blog-f6af5.firebaseio.com/posts.json")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: "/push/" + key,
              payload: { postData: res.data[key] }
            });
          }

          return routes;
        });
    }
  }
};
