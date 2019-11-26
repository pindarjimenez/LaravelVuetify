import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';

require('./bootstrap');

window.Vue = require('vue');
Vue.use(Vuetify);
Vue.use(VeeValidate);

Vue.component('guest-list', require('./components/guest/ListComponent.vue').default);
Vue.component('create-guest', require('./components/guest/CreateComponent.vue').default);
// Vue.component('create-guest', require('./components/guest/VuetifyComponent.vue').default);

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
});
