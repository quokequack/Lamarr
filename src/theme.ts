import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lamarrLight',
    themes: {
      lamarrLight: {
        dark: false,
        colors: {
          background: '#F4F3F1',
          surface: '#FFFFFF',
          primary: '#171615',
          secondary: '#57514E',
          accent: '#D9D9D9',
          'on-background': '#171615',
          'on-surface': '#171615',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
