import { defineNuxtConfig } from 'nuxt'
import { Script } from 'nuxt/dist/head/runtime/components'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        '@pinia/nuxt',
    ],
    plugins: [
        '~/plugins/directives/v-click-outside',
    ]    
})
