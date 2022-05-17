import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store';
import router from './router';
import { loadFonts } from './plugins/webfontloader'
import * as VeeValidate from 'vee-validate';
import Notifications from '@kyvg/vue3-notification'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

loadFonts()
createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(VeeValidate)
  .use(Notifications)
  .mount('#app')