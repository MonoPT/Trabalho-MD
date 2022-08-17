<template>
    <NuxtLink to="shop"> 
        <div class="btn" >
            <p>{{text}}</p>
            <img src="@/assets/icons/arrow.svg" alt="" v-if="iconIndex === 0">
            <img src="@/assets/icons/cartAdd.svg" alt="" v-if="iconIndex === 1">
        </div>
    </NuxtLink>  
</template>

<script setup lang="ts">
    defineProps({
        text: {
            required: false,
            type: String,
            default: 'OUR STORE'
        },
        iconIndex: {
            required: false,
            type: Number,
            default: 0
        }
    })
</script>

<style lang="scss" scoped>
    .btn {
        --fontSize: 1.4em;
        display: inline-flex;
        padding: 10px 25px;
        background: var(--primaryColor);
        cursor: pointer;
        align-items: center;
        color: #fff;
        transition: .12s;
        border-radius: 5px;

        p {
            font-size: var(--fontSize);
            text-transform: uppercase;
            letter-spacing: 4%;
            font-weight: 350;
            
        }

        img {
            display: block;
            height: calc(var(--fontSize) * 1.2);
            width: auto;
            margin-left: 40px;
            filter: invert(1);
        }

        &:hover {
            background-color: var(--primaryColorHover);
        }
    }

    a {
        text-decoration: none;
    }
</style>