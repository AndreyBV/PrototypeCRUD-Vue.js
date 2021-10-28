// import axios from "axios";
 
// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-type": "application/json",
//   }
// });

import axios from 'axios';
import Vue from 'vue';
import Vuelidate from 'vuelidate'
import VueAxios from 'vue-axios';
import dateFormat from 'dateformat'

Vue.use(VueAxios, axios);
// Vue.use(dateFormat);
Vue.use(Vuelidate);

const HTTP =  axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-type': 'application/json',
    }
});

export default HTTP;