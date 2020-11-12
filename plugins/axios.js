import https from "https";

export default function ({ $axios, $nuxt }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
}
