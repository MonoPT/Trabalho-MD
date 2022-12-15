import { defineNuxtConfig } from 'nuxt'
import { Script } from 'nuxt/dist/head/runtime/components'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        '@pinia/nuxt',
    ],
    plugins: [
        '~/plugins/directives/v-click-outside',
    ],
    head: {
        title: 'wetheknot',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          {
            hid: 'wetheknot',
            name: 'wetheknot',
            content: 'We from wetheknot are compromised with finding the perfect balance beetween environment and clothing manufactorying, keeping sustainability in mind for every product we design.'
          }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        htmlAttrs: {
            lang: 'en'
        }
    }    
})
