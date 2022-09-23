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
        

        <a class="topic left" href="#"><img src="@/assets/icons/user.svg" alt=""> Account</a>
        <a class="topic cart" href="#"><img src="@/assets/icons/cart.svg" alt="Cart">0</a>
    </header>

    <header v-else id="navbar" class="navMobile">
        <img src="@/assets/icons/MenuMobile.svg" alt="Menu" class="menuMobile" @click="showMobileNav" />
        <NuxtLink to="/">
            <img src="@/assets/logo.png" alt="Wetheknot" />
        </NuxtLink> 

        <a class="topic cart left" href="#"><img src="@/assets/icons/cart.svg" alt="Cart">0</a>

        <div id="mobileNavMenu" :class="`${mobileMenuToggle ? '' : 'disabled'}`" ref="mobileMenuRef">
            <div class="icon-bar">
                <NuxtLink to="/"><img src="@/assets/logo.png" alt="Wetheknot" @click="showMobileNav"/></NuxtLink> 
                <div class="close" @click="closeMobileMenu"></div>

                
            </div>
            <div class="menu-list">
                <div class="list-container" v-for="(navItem, index) in navbarOptions" :key="index" :class="`topic ${navItem.dropdown.length > 0 ? 'dropdown' : ''}`" :to="navItem.link" @click="toggleMobileSubMenu($event)">
                    
                    <template v-if="navItem.dropdown.length > 0">
                        {{navItem.name}}
                    </template>
                    <template v-else>
                        <NuxtLink :to="navItem.link" @click="showMobileNav">
                            {{navItem.name}}
                        </NuxtLink>
                    </template>

                    <div class="dropDown-optionBox" v-if="navItem.dropdown.length > 0">
                        <template v-for="(dropdownItem, index) in navItem.dropdown" :key="index">
                            <NuxtLink :to="dropdownItem.link" @click="showMobileNav">
                                {{dropdownItem.name}}
                            </NuxtLink>
                        </template>
                    </div>
                </div>
            </div>
        </div>
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


    ///Mobile navbar
    const mobileMenuToggle = ref(false)
    const mobileMenuRef = ref<HTMLElement>(null)

    const toggleMobileSubMenu = (el) => {
        const eElement:HTMLElement = el.target

        eElement.classList.toggle('active')
    }

    const showMobileNav = () => {
        mobileMenuToggle.value = !mobileMenuToggle.value;

        Array.from(mobileMenuRef.value.children[1].children).forEach(element => {
            if(element.classList.contains('dropdown')) {
                element.classList.remove('active');
            }
        });
    }

    const closeMobileMenu = () => {
        showMobileNav();
        mobileMenuToggle.value = false;
    }


</script>

<style scoped lang="scss">
    #navbar {
        width: 100%;
        height: 70px;
        background: var(--bgColor);
        padding: 25px var(--pageMargins);
        display: flex;
        align-items: center;
        z-index: 4001;

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

    #mobileNavMenu {

        &.disabled {
            transform: translateX(-100%);
        }

        display: block;
        position: fixed;
        top: 0;
        left: 0;
        padding: 15px;
        height: 100vh;
        width: 90vw;
        background: rgb(29, 29, 29);
        z-index: 4000;
        transition: .2s;


        .icon-bar, .icon-bar a {
            display: flex;
            width: 100%;
            height: 50px;
            align-items: center;

            img {
                height: min(100%, 30px);
                width: auto;
                filter: invert(1);
            }

            .close {
                display: block;
                position: relative;
                left: auto;
                margin-right: 1em;
                width: 1.5em;
                height: 1.5em;
                cursor: pointer;

                
                
                &::after,&::before {
                    content: '';
                    display: block;
                    position: relative;
                    width: 100%;
                    height: 3px;
                    background: #fff;
                    margin-top: calc(100% - 3px);
                    transform: rotate(50deg);
                    transform-origin: center;
                }

                &::after {
                    transform: rotate(-50deg);
                    margin-top: -3px;
                }

                &:hover {
                    &::after, &::before {
                        transition: .12s;
                        background: var(--primaryColor);
                    }
                }
            }
        }

        

        .menu-list {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: calc(100% - 80px);
            padding-bottom: 20px;
            overflow-y: scroll;


            .list-container a{
                text-decoration: none;
                color: inherit;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            .topic {
                display: block;
                color: #fff;
                font-size: 1.4em;
                padding-top: 5px;
                margin-top: 18px;
                padding-bottom: 5px;
                cursor: pointer;
                position: relative;

                margin-left: 0 !important;
                height: auto;

                &:nth-child(1) {
                    margin-top: 32px;
                }

                &:hover {
                    color: var(--primaryColorHover) !important;
                    transition: .12s;
                }

                .dropDown-optionBox {
                    overflow: hidden;
                    height: max-content;
                    transition: max-height 0.15s ease-out;

                    a {
                        display: block;
                        height: auto;
                        text-decoration: none;
                        color: rgb(192, 192, 192);
                        font-size: .85em;
                        padding-top: .4em;
                        
                        &:nth-child(1) {
                            padding-top: .15em;
                        }

                        &:hover {
                            color: var(--primaryColor);
                            transition: .12s;
                        }
                    }
                }

                &:not(.active) {
                    .dropDown-optionBox {
                        height: 0;
                        transition: .12s;
                    } 
                }

                &:hover {
                    color: var(--primaryColor);
                    transition: .12s;

                    &.dropdown::after {
                        border-color: var(--primaryColor);
                        transition: .12s;
                    }
                }

                
                &.dropdown::after {
                    content: '';
                    background-image: none !important;
                    border: 1px solid #fff;
                    width: .6em;
                    height: .6em;
                    border-right: none;
                    border-bottom: none;
                    transform: rotate(225deg) !important;
                    margin-top: .2em;
                    top: 0;
                    position: absolute;
                    right: 1em;
                }
            }
        }
    }
</style>