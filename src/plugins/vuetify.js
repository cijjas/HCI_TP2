/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
      mdi,
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1C4035',
          secondary: '#F4CF6D',
          darksecondary: '#D69923',
          lighterSecondary: '#E3DBAD',
          offcolor: '#81938E',
          gris: '#AFC1BB',
          lightergray: '#326D3F',
          lightersecondary : '#F3EED3',
          verdatim:'#496F70',
          g3: '#DBD0AF',
          g2: '#E8DDBD',
          g1: '#EFE5C5',
          m1: '#795454',
          brown: '#f8dfc2',
          common: '#f4e6bf',
          common2: '#f1edcd',
        },
      },
    },
  },
})
