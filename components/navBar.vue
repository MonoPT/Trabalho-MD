<template>
    <header id="navbar" v-if="!storeScreenHandler.collapseNav">
        <NuxtLink to="/"><img src="@/assets/logo.png" alt="Wetheknot" /></NuxtLink> 

        <NuxtLink v-for="(navItem, index) in navbarOptions" :key="index" :class="`topic ${navItem.dropdown.length > 0 ? 'dropdown' : ''}`" :to="navItem.link">
            {{navItem.name}}
            <div class="dropDown-options" v-if="navItem.dropdown.length > 0">
                <template v-for="(dropdownItem, index) in navItem.dropdown" :key="index">
                    <NuxtLink :to="dropdownItem.link">
                        {{dropdownItem.name}}
                    </NuxtLink>
                </template>
            </div>
        </NuxtLink>
        <!--<a v-for="(navItem, index) in navbarOptions" :key="index" :class="`topic ${navItem.dropdown.length > 0 ? 'dropdown' : ''}`" :href="navItem.link" >
            {{navItem.name}}
            <div class="dropDown-options" v-if="navItem.dropdown.length > 0">
                <template v-for="(dropdownItem, index) in navItem.dropdown" :key="index">
                    <a :href="dropdownItem.link">{{dropdownItem.name}}</a>
                </template>
            </div>
        </a>-->

        <a class="topic left" href="#"><img src="@/assets/icons/user.svg" alt=""> Account</a>
        <a class="topic cart" href="#"><img src="@/assets/icons/cart.svg" alt="Cart">0</a>
    </header>

    <header v-else id="navbar" class="navMobile">
        <img src="@/assets/icons/MenuMobile.svg" alt="Menu" class=" menuMobile" />
        <NuxtLink to="/"><img src="@/assets/logo.png" alt="Wetheknot" /></NuxtLink> 

        <a class="topic cart left" href="#"><img src="@/assets/icons/cart.svg" alt="Cart">0</a>
    </header>

</template>

<script setup lang="ts">
    import { useScreenHandler } from '~~/stores/ScreenHandler'
    const storeScreenHandler = useScreenHandler()

    const navbarOptions = [
        {
            name: 'Promotions',
            link: '/shop/Promotions',
            dropdown: [] 
        },
        {
            name: 'Acessories',
            link: '/shop/Accessories',
            dropdown: [
                {
                    name: 'Backpacks',
                    link: '/shop/Backpacks'
                },
                {
                    name: 'Bags',
                    link: '/shop/Bags'
                },
                {
                    name: 'Belts',
                    link: '/shop/Belts'
                },
                {
                    name: 'Caps & Scarves',
                    link: '/shop/Caps-e-Scarves'
                },
                {
                    name: 'Card holders',
                    link: '/shop/Card-holders'
                },
                {
                    name: 'Pencil cases',
                    link: '/shop/Pencil-cases'
                },
                {
                    name: 'Pouches',
                    link: '/shop/Pouches'
                },

            ] 
        },
        {
            name: 'Clothing',
            link: '/shop/Clothing',
            dropdown: [
                {
                    name: 'T-shirts & Long sleeves',
                    link: '/shop/T-shirts-e-Long-sleeves'
                },
                {
                    name: 'Sweatshirts & Hoodies',
                    link: '/shop/Sweatshirts-e-Hoodies'
                },
                {
                    name: 'Jackets',
                    link: '/shop/Jackets'
                },
                {
                    name: 'Trousers & Shorts',
                    link: '/shop/Trousers-e-Shorts'
                },
            ] 
        },
        {
            name: 'Bath & Shower',
            link: '/shop/Bath-e-Shower',
            dropdown: [
                {
                    name: 'Handmade soaps',
                    link: '/shop/Handmade-soaps'
                },
                {
                    name: 'Shampoo bars',
                    link: '/shop/Shampoo-bars'
                },
            ] 
        },
        {
            name: 'Essential kits',
            link: '#',
            dropdown: [] 
        },
        {
            name: 'About',
            link: '/about',
            dropdown: [] 
        },
    ]


</script>

<style scoped lang="scss">
    #navbar {
        width: 100%;
        height: 70px;
        background: var(--bgColor);
        padding: 25px var(--pageMargins);
        display: flex;
        align-items: center;

        img, a {
            height: 100%;
            width: auto;
        }

        img {
            transform: translateY(6px);
        }

        img.left {
            margin-left: auto;   
        }

        a.topic {
            margin-left: 1.9em;
            text-decoration: none;
            color: #000;
            font-size: 1.1em;
            cursor: pointer;
            position: relative;
            display: inline-block;
            transition: .12s;

            &:first-of-type {
                margin-left: 3em;
            }

            img {
                width: auto;
                height: 1.2em;
                margin-right: 5px;
                transition: .12s;
            }

            &.left {
                margin-left: auto;   
            }

            &.cart {
                img {
                    height: 1.4em;
                    transform: translateX(12px);
                }

                &.left {
                    margin-left: auto;
                    
                }

                &::after {
                    width: 0;
                }
            }

            &::after {
                content: '';
                display: block;
                height: 1.3em;
                width: 18px;
                margin-left: 3px;
                display: inline-block;
            }

            &.dropdown {
                &::after {
                    background-image: url('@/assets/icons/arrow.svg');
                    background-size: cover;
                    transform: translateY(3px) rotate(90deg);
                    transition: .2s;
                }

                &:hover {
                    &::after {
                        transform: translateY(9px) rotate(270deg);
                        filter: var(--primaryColorImgFilter);
                        transition: .12s;
                    }
                }
            }

            &:hover {
                color: var(--primaryColor);

                img {
                    filter: var(--primaryColorImgFilter);
                    transition: .12s;
                    -webkit-transition: .12s -webkit-filter;
                    -moz-transition: .12s -moz-filter;
                    -moz-transition: .12s filter;
                    -ms-transition: .12s -ms-filter;
                    -o-transition: .12s -o-filter;
                    transition: .12s filter;
                }

                .dropDown-options {
                    transition: .2s;
                    transform: scaleY(100%);
                    
                }
            }

            .dropDown-options {
                min-width: 100%;
                min-height: 5px;
                background: var(--bgColor);
                padding: 12px;
                position: absolute;
                display: flex;
                top: calc(100% + 8px);
                -webkit-box-shadow: 1px 1px 10px 2px rgba(0,0,0,0.25); 
                box-shadow: 1px 1px 10px 2px rgba(0,0,0,0.25);
                border-radius: 5px;
                pointer-events: all;
                z-index: 10000;
                overflow: hidden;
                flex-direction: column;
                inline-size: max-content;
                transform-origin: top left;
                transform: scaleY(0);

                a {
                    display: block;
                    color: #000;
                    text-decoration: none;

                    &:not(:nth-child(1)) {
                        margin-top: 12px;
                    }

                    &:hover {
                        cursor: pointer;
                        color: var(--primaryColor);
                        transition: .12s;
                    }
                }
            }
        }

        .menuMobile {
            margin-right: 32px;
            transition: .12s;

            &:hover {
                filter: var(--primaryColorImgFilter);
                
            }
        }

        &.navMobile {
            .cart {
                img {
                    height: 1.7em !important;
                }
            }
        }

        @media  (max-width: 1600px) {
            a.topic { 
                margin-left: 1.2em;
                font-size: 1em;

                &.cart {
                    margin-left: 0;
                }
            }
        }

        @media (max-width: 1300px) {
            a.topic { 
                margin-left: .8em;
                font-size: 1em;

                
            }
        }
    }
</style>