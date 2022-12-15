<template>
    <div>
        <landingContent />
        <AboutCompany />
        <ProductArea />
        <Values />
    </div>
</template>

<script setup lang="ts">
    import { useScreenHandler } from '~~/stores/ScreenHandler'
    const storeScreenHandler = useScreenHandler()

    useHead({
        title: 'Wetheknot',
        meta: [
            {name: "title", content: 'wetheknot'},
            {name: "keywords", content: "cloth, fashion, wetheknot, durability, environment, friendly, unisex, reuse, recycle, simplicity, portuguese clothing, portugal, roupa portuguesa, roupa, unisexo, simplicidade, casacos, jackets, jeans, calças, soap"},
            {name: "description", content: "We from wetheknot are compromised with finding the perfect balance beetween environment and clothing manufactorying, keeping sustainability in mind for every product we design."},
            {name: "author", content: "Rodrigo Fernandes"}
        ]
    })

    
</script>

<style scoped lang="scss">
    * {
        opacity: 0;

        @keyframes show {
            to {
                opacity: 1;
            }
        }

        animation: show .7s ease-in forwards;
    }
</style>