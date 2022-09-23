<template>
    <nuxt-link :to="link">
        <div class="card">
            <img :src="img" alt="" :style="`--transformX: ${transform.x}; --transformY: ${transform.y}; --zoom: ${zoom}`">
            <formLink :text="category" :linkTo="link" class="linkToCat" :hasArrow="hasArrow"/>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
    

    defineProps({
        img: {
            type: String,
            required: true
        },
        transform: {
            type: Object,
            required: false,
            default: {x: 0, y:0}
        },
        zoom: {
            type: String,
            required: false,
            default: "1"
        },
        category: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        hasArrow: {
            type: Boolean,
            required: false,
            default: false
        }
    })
</script>

<style scoped lang="scss">
    .card {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1.5;
        min-height: 220px;
        display: block;
        position: relative;
        background: rgb(219, 219, 219);
        overflow: hidden;
        color: #fff;
        border-radius: 5px;

        &:hover {
            img {
                opacity: .7;
            }    
        }
        

        &::after {
            content: '';
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            -webkit-box-shadow: inset 0px 0px 70px 40px rgba(0,0,0, .4); 
            box-shadow: inset 0px 0px 70px 40px rgba(0,0,0, .4);
            pointer-events: none;
            z-index: 2;
        }

        img {
            position: absolute;
            display: block;
            left: 0;
            top: 0;
            top: -9999px;
            bottom: -9999px;
            left: -9999px;
            right: -9999px;
            height: calc(var(--zoom) * 100%);
            width: auto;
            margin: auto;
            transform: translateY(calc(1% * var(--transformY)));
            transition: .12s;

            pointer-events: none;
        }

        .linkToCat {
            position: absolute;
            left: 20px;
            bottom: 20px;
            font-size: 1.3em;
            font-weight: bold;
            letter-spacing: 4%;
            z-index: 3;

            @media (max-width: 1060px) {
               font-size: 1em; 
            }

            @media (max-width: 900px) {
               font-size: .9em; 
               left: 10px;
                bottom: 10px;
            }
        }
    }
</style>