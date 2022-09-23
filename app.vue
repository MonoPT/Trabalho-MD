<template>
    
    <div id="popUpsModels" ref="popupModal"></div>
    <transition name="fade">
        <loading v-if="!mainStore.appIsLoaded"/>
    </transition>
    <div v-if="mainStore.appIsLoaded">
        <navBar/>
        <NuxtPage/>
        <Footer/>
    </div>

    
</template>

<script setup lang="ts">
    import { useScreenHandler } from '~~/stores/ScreenHandler'
    import { useMainStore } from '~~/stores/mainStore'
     
    /*onMounted(() => {
        console.log(window.gtag)
    })*/
    
    const storeScreenHandler = useScreenHandler()
    const mainStore = useMainStore()

</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    :root {
        --bgColor: #FFFAFA;
        --primaryColor: #0C749F;
        --secondaryColor: #0F0F0F;
        --thirdColor: #1988b8c7;
        --pageMargins: 180px; /*Margin in desktop*/ 

        //Color hover
        --primaryColorHover: #084e6c;

        //Filter version for img
        --primaryColorImgFilter: invert(26%) sepia(91%) saturate(1383%) hue-rotate(172deg) brightness(100%) contrast(91%);

        @media (max-width: 1455px) {
            --pageMargins: 140px;
        }

        @media (max-width: 1350px) {
            --pageMargins: 120px;
        }

        @media (max-width: 1000px) {
            --pageMargins: 90px;
        }

        @media (max-width: 768px) {
            --pageMargins: 70px;
        }
        
        @media (max-width: 650px) {
            --pageMargins: 25px;
        }
    }

    *, *:after, *:before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Fira Sans', sans-serif;
    }

    body {
        background-color: var(--bgColor);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

</style>
