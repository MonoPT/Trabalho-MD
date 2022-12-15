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
            {name: "title", content: 'wetheknot'},
            {name: "keywords", content: "cloth, fashion, wetheknot, durability, environment, friendly, unisex, reuse, recycle, simplicity, portuguese clothing, portugal, roupa portuguesa, roupa, unisexo, simplicidade, casacos, jackets, jeans, calças, soap"},
            {name: "description", content: "We from wetheknot are compromised with finding the perfect balance beetween environment and clothing manufactorying, keeping sustainability in mind for every product we design."},
            {name: "author", content: "Rodrigo Fernandes"},
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
