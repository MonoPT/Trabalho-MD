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
        title: 'Wetheknot'
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