<template>
    <footer>
        <div class="nav">
            <div class="col">
                <span class="title" @click="toggleColapse()">Links</span>
                <ul>
                    <li><NuxtLink to="#">Contact Us</NuxtLink></li>
                    <li><NuxtLink to="#">Returns / Deliveries</NuxtLink></li>
                    <li><NuxtLink to="#">FAQs</NuxtLink></li>
                    <li><NuxtLink to="#">Terms & Conditions</NuxtLink></li>
                </ul>
            </div>

            <div class="col">
                <span class="title" @click="toggleColapse()">Community</span>
                <ul>
                    <li><NuxtLink to="#">Newsletter</NuxtLink></li>
                    <li><NuxtLink to="#">Wholesale</NuxtLink></li>
                    <li><NuxtLink to="#">Store</NuxtLink></li>
                    <li><NuxtLink to="#">Facebook</NuxtLink></li>
                    <li><NuxtLink to="#">Instagram</NuxtLink></li>
                </ul>
            </div>

            <div class="col">
                <span class="title" @click="toggleColapse()">Legal</span>
                <ul>
                    <li><NuxtLink to="#">Privacy policy</NuxtLink></li>
                    <li><NuxtLink to="#">cookie Policy</NuxtLink></li>
                    <li><NuxtLink to="#">Alternative dispute resolution</NuxtLink></li>
                    <li><NuxtLink to="#">Complaints book</NuxtLink></li>
                </ul>
            </div>
        </div>
        <div class="info">
            <span>©wetheknot All rights reserved {{new Date().getFullYear()}}</span>
            <span><NuxtLink to="#">PRIVACY / COOKIES PREFERENCES</NuxtLink></span>
        </div>
    </footer>
</template>

<script setup lang="ts">
    const toggleColapse = () => {
        event.path[1].classList.toggle('unhide')
    }
</script>

<style scoped lang="scss">
    footer {
        padding: 40px var(--pageMargins);
        display: block;
        width: 100%;
        background: #000;

        @media (max-width: 1200px) {
            padding: 20px var(--pageMargins);
        }

        .nav {
            display: grid;
            grid-template-columns: repeat(3, auto);
            gap: 5px;
            justify-content: space-between;
            color: #fff;

            @media (max-width: 950px) {
                grid-template-columns: 1fr;
            }

            .title {
                font-size: 1.3em;
                font-weight: 500;
                position: relative;
                transition: .12s;

                @media(max-width: 1400px) {
                  font-size: 1.2em;  
                }

                @media (max-width: 950px) {
                    margin-top: 20px;


                    display: inline-block;
                    &::after {
                        content: url('@/assets/icons/arrow.svg');
                        filter: invert(1);
                        display: inline-block;
                        position: absolute;
                        right: -20px;
                        top: 13px;
                        width: 20px;
                        height: 20px;

                        transform: rotate(270deg) scale(.4);
                    }
                
                }

            }

            .col {
                &:not(.unhide) {
                    ul {
                        @media (max-width: 950px) {
                            display: none;
                        }
                    }

                    .title {
                        @media (max-width: 950px) {
                                                       

                            &::after {
                                transform: rotate(90deg) scale(.4);
                                right: -35px;
                                top: -8px;
                            }
                        }
                    }
                }
                
            }

            ul {
                list-style: none;
                margin-top: 18px;
                transition: .12s;

                li {
                    font-size: 1.1em;
                    font-weight: 300;
                    margin-top: 8px;

                    @media(max-width: 1400px) {
                        font-size: .9em;  
                    }

                    a {
                        text-decoration: none;
                        color: inherit;
                        transition: .12s;

                        &:hover {
                            color: rgb(140, 140, 140);
                        }
                    }
                }
            }
        }

        .info {
            color: #fff;
            margin-top: 30px;
            font-weight: 300;
            display: flex;

            @media (max-width: 480px) {
                flex: 1;
                flex-direction: column-reverse;
            }

            span {
                display: block;
                font-size: .9em;

                @media(max-width: 1400px) {
                    font-size: .7em;  
                }
                
                &:nth-child(2) {
                    margin-left: auto;
                    text-align: right;

                    @media (max-width: 480px) {
                        margin-left: 0;
                        text-align: left;
                        margin-bottom: 10px;
                        font-size: .65em;
                    }

                    a {
                        cursor: pointer;
                        color: rgb(151, 151, 151);  
                        text-decoration: none;
                        
                    }
                }
            }
        }
    }
</style>