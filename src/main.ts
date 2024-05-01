import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'mainTheme',
    themes: {
      mainTheme: {
        dark: false,
        colors: {
          primary: '#5A2E2E',
          secondary: '#FFFEDF',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  },
  components,
  directives
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(Toast, { position: POSITION.BOTTOM_CENTER, timeout: 3000 });

app.mount('#app');
