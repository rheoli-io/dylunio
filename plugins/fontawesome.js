import Vue from "vue";
// the component
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// the library
import { library } from "@fortawesome/fontawesome-svg-core";
// add more icon categories as you want them, even works with pro packs
import brands from "@fortawesome/fontawesome-free-brands";
import solid from "@fortawesome/fontawesome-free-solid";

// associate it to the library, if you need to add more you can separate them by a comma
library.add(brands);
library.add(solid);
Vue.component("font-awesome-icon", FontAwesomeIcon);
