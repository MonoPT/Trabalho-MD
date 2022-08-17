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

</style>