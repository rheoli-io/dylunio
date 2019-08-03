export default function({ $axios, redirect }) {
  $axios.defaults.headers["Content-Type"] = "application/vnd.api+json";
  $axios.defaults.headers["Accept"] = "application/vnd.api+json";
}
