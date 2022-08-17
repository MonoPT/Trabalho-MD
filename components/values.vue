<template>
    <div class="companyValues">
        <h1>DESIGN FOR LONGEVITY</h1>
        <p>The materials we use are submitted to a rigorous selection process to guarantee that our quality and sustainability criteria are being met. These include organic cotton, featured in all the t-shirts and sweatshirts, and vegan leather, used in our roll-top backpacks and other accessories.</p>
        <p class="more">Discover more about the <NuxtLink to="#" class="bold">materials​.</NuxtLink></p>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .companyValues {
        padding: 120px var(--pageMargins);
        padding-top: 0;

        h1 {
            font-weight: bold;
            line-height: 175%;
            font-size: 2.1em;

            @media (max-width: 1500px) {
               font-size: 1.7em; 
            }

            @media (max-width: 1000px) {
               font-size: 1.45em; 
            }
        }

        p {
            font-size: 1.8em;
            font-weight: 300;
            margin-top: 20px;
            line-height: 155%;

            @media (max-width: 1500px) {
               font-size: 1.4em; 
            }

            @media (max-width: 1000px) {
               font-size: 1.2em; 
            }

            @media (max-width: 750px) {
               font-size: 1em; 
            }

            &.more {
                font-size: 1.4em;
                color: #4C4C4C;

                @media (max-width: 1500px) {
                    font-size: 1.1em; 
                }

                @media (max-width: 1000px) {
                    font-size: 1em; 
                }

                @media (max-width: 750px) {
                    font-size: .9em; 
                }

                .bold {
                    color: #3a3a3a;
                    font-weight: 400;
                    text-decoration: none;
                    transition: .12s;

                    &:hover {
                        color: #000;
                    }
                }
            }
        }
    }
</style>