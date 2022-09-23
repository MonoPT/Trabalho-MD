import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: 'G-9H9S3KTQ1K'
      }
    }, router)
})