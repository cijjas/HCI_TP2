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
          secondary: '#EECC66',
          offcolor: '#7E9694',
          gris: '#AFC1BB',
          primaryclarito: '#497065'

        },
      },
    },
  },
})
