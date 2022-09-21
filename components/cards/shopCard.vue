<template>
    <div class="card" :style="`--cardH: ${cardH}px`" ref="cardCont">
        <nuxt-link :to="`/product/${name.replaceAll('-&-', '-e-').replaceAll(' ', '-')}-${id}`">
            <div class="image-wrapper" :class="`${imagesAreLoaded ? 'imagesLoaded' : ''}`">
                <template v-if="!imgLoadError">
                    <img ref="firstImage" alt="">
                    <img ref="secondImage" alt="" class="hoverImg">
                </template>
                <div class="imageErrorContainer" v-else>
                    Couldn't load image
                </div>
            </div>
            <div class="promotion" v-if="promotionPercentage > 0">- {{promotionPercentage}}%</div>
            <div class="productInfo">
                <div class="name">
                    <div class="itemName">{{name}}</div>
                    <div class="itemMaterial">{{material}}</div>
                </div>
                <div class="price">
                    <div class="discount" v-if="promotionPercentage > 0">{{originalPrice.toFixed(2).replace('.', ',')}} €</div>
                    <div class="currentPrice">{{currentPrice.toFixed(2).toString().replace('.', ',')}} €</div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script setup lang="ts"> 
    const props = defineProps({
        cardH: {
            type: Number,
            required: true,
            default: 0
        },
        img: {
            type: String,
            required: true
        },
        hoverImg: {
            type: String,
            required: true
        },
        originalPrice: { //Promotion value, if more than one, then show it on screen
            type: Number,
            required: false,
            default: 10
        },
        currentPrice: {
            type: Number,
            required: true,
            default: 0
        },
        name: {
            type: String,
            required: true,
        },
        material: {
            type: String,
            required: true,
        },
        updateSort: {
            type: String,
            required: true
        },
        updateCategory: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    })

    const cardCont = ref(null)

    const promotionPercentage = computed(() => {
        return props.currentPrice !== props.originalPrice ? (100 - ((props.currentPrice * 100) / props.originalPrice)).toFixed(0)  : 0
    });
    const imagesAreLoaded = ref(false)

    let observer;
    onMounted(() => {
        observer = new IntersectionObserver(loadImagesAsync, {
            rootMargin: '0px',
            threshold: 0
        });
        observer.observe(cardCont.value);
    })

    onBeforeUnmount(() => {
        observer.unobserve(cardCont.value)
    })

    const firstImage = ref(null)
    const secondImage = ref(null)
    const imgLoadError = ref(false)

    const loadImagesAsync = (entries, observer) => {
        if(entries[0].isIntersecting) {
            let downloadingImageOne = new Image();
            downloadingImageOne.onload = function(){
                const evento:any = this;
                firstImage.value.src = evento.src;   
                imagesAreLoaded.value = true;
            };

            downloadingImageOne.onerror = () => {
                imgLoadError.value = true;
                imagesAreLoaded.value = true;
            }
            
            let downloadingImageTwo = new Image();
            downloadingImageTwo.onload = function(){
                const evento:any = this;
                secondImage.value.src = evento.src;  
            };

            downloadingImageOne.src = props.img;
            downloadingImageTwo.src = props.hoverImg;
            observer.unobserve(cardCont.value);
        }
    }

    const linkName = computed(() => {
        let productNameReplaced = props.name
        productNameReplaced = productNameReplaced.replaceAll('-&-', '-e-')
        productNameReplaced = productNameReplaced.replaceAll(' ', '-')
        return linkName;
    })
    

    //Check for order change
    onUpdated(() => {
        updateImageDisplayed();
    })

    const updateImageDisplayed = () => {
        secondImage.value.src = ''; 
        firstImage.value.src = ''; 
        observer.unobserve(cardCont.value);
        if(document.contains(cardCont.value)) observer.observe(cardCont.value);

        /*productNameReplaced.value = props.name
        productNameReplaced.value = productNameReplaced.value.replaceAll('-&-', '-e-')
        productNameReplaced.value = productNameReplaced.value.replaceAll(' ', '-')*/
    }

    

</script>

<style scoped lang="scss">
    .card {
        width: 100%;
        position: relative;

        a {
            text-decoration: none;
            color: inherit;
        }

        .image-wrapper {
            height: var(--cardH);
            width: 100%;
            background: rgb(227, 227, 227);
            border-radius: 3%;
            outline: none;
            border: 0;
            position: relative;
            display: block;
            overflow: hidden;

            

            img {
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: auto;
                transition: .25s;

                &.hoverImg {
                    opacity: 0;
                }
            }

            &:hover {
                img.hoverImg {
                    opacity: 1;
                }
            }

            &:not(.imagesLoaded) {
                background: linear-gradient(-45deg, #d9d9d9d9, #e7e7e7, #c8c8c8d9, #d9d9d9d9);
                background-size: 400% 400%;
                animation: gradient 2s ease infinite;

                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            }

            .imageErrorContainer {
                display: flex;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 15px;
                font-size: 21px;
                color: rgb(254, 55, 55);
                background: rgb(225, 225, 225);
            }
        }

        .promotion {
            position: absolute;
            left: 0;
            top: 8%;
            background: #F8F8F8;
            opacity: .95;
            padding: 5px 10px;
            font-size: .9em;
            font-weight: 300;
            color: #F94F44;
            border-radius: 0px .4em .4em 0px;

            @media (max-width: 1400px) {
                font-size: .8em;
            }

            @media (max-width: 1400px) {
                font-size: .7em;
                padding: 3  px 8px;
            }
        }

        .productInfo {
            margin-top: 17px;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 10px;
            color: #000;
            font-weight: 300;

            .name{
                .itemName {
                    font-size: 1.45em;
                    transition: .12s;

                    &:hover {
                        color: var(--primaryColor);
                    }
                }
                .itemMaterial {
                    color: #6f6f6f;
                    font-size: .9em;
                    margin-top: 3px;
                }
            }

            .price {
                display: flex;

                .discount {
                    font-size: .8em;
                    margin-right: 8px;
                    color: #414141;
                    position: relative;

                    &::after {
                        content: '';
                        display: block;
                        width: 75%;
                        height: .1em;
                        background: #272727;
                        border-radius: 100%;
                        transform: translateY(-.7em) rotate(-12deg);
                    }
                }

                .currentPrice {
                    color: #F94F44;
                    font-size: 1em;
                }
            }

            @media (max-width: 1750px) {
                .name{
                    .itemName {
                        font-size: 1.15em;
                    }
                    .itemMaterial {
                        font-size: .75em;
                    }
                }

                .price {
                    .discount {
                        font-size: .75em;
                    }
                    .currentPrice {
                        font-size: .9em;
                    }
                }
            }

            @media (max-width: 1400px) {
                .name{
                    .itemName {
                        font-size: 1em;
                    }
                    .itemMaterial {
                        font-size: .75em;
                    }
                }

                .price {
                    .discount {
                        font-size: .65em;
                    }
                    .currentPrice {
                        font-size: .8em;
                    }
                }
            }

            @media (max-width: 1100px) {
                .name{
                    .itemName {
                        font-size: .85em;
                    }
                    .itemMaterial {
                        font-size: .55em;
                    }
                }

                .price {
                    .discount {
                        font-size: .6em;
                        margin-right: 5px;
                    }
                    .currentPrice {
                        font-size: .7em;
                    }
                }
            }

            @media (max-width: 500px) {
                .name{
                    .itemName {
                        font-size: .7em;
                    }
                    .itemMaterial {
                        font-size: .5em;
                    }
                }

                .price {
                    .discount {
                        font-size: .55em;
                        margin-right: 5px;
                    }
                    .currentPrice {
                        font-size: .6em;
                    }
                }
            }
        }
    }
</style>