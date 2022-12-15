<template>
    <div id="product-wrapper" :class="`${screenHandler.isMobile ? 'isMobile' : ''}`" v-if="item">
        <div class="image">
            <div class="image-wrapper" ref="aspectRatioContainer" :style="`--ratio: ${ratio}`" v-if="!imageError">
                <div class="image-controls">
                    <div class="btn-change-pic next" @click="changeToImage(1, true)"></div>
                    <div class="btn-change-pic prev" @click="changeToImage(-1, true)"></div>
                    <div class="dot-controls">
                        <div :class="`pic-dot ${currentImage === 0 ? 'active' : ''}`" @click="changeToImage(0)"></div>
                        <div :class="`pic-dot ${currentImage === 1 ? 'active' : ''}`" @click="changeToImage(1)"></div>
                    </div>
                </div>
                <img :src="item.firstimg" alt="" :class="`${currentImage === 0 ? 'active' : ''}`" @error="imageFailedToLoad" />
                <img :src="item.secondimg" alt="" :class="`${currentImage === 1 ? 'active' : ''}`" />
            </div>
            <div class="image-wrapper error" id="eror-icon" :style="`--ratio: ${ratio}`" v-else>
                <div class="icon"></div>
                couldn't load image
            </div>
        </div>

        <div class="location">
            <template v-for="(category, index) in item.categories">
                <span  v-if="!exclusions.includes(category)"><NuxtLink :to="`/shop/${category}`">{{category}}</NuxtLink> </span>
            </template>
            <span class="currentItem">{{item.name}}</span>
        </div>
        <div class="info">
            <div class="item-name">{{item.name}}</div>
            <div class="item-material">{{item.material}}</div>
            <div class="prices">
                <div class="old" v-if="item.originalprice !== item.currentprice">{{item.originalprice.toFixed(2).replace('.', ',')}} €</div>
                <div class="new">{{item.currentprice.toFixed(2).replace('.', ',')}} €</div>
            </div>
            <div class="description">
                <p v-for="p in descp">{{p !== 'undefined.' ? p : ''}}</p>
            </div>

            <div class="size-selector" v-if="item.categories.includes('Clothing')">
                <div class="text">
                    <h4>Choose a size</h4><div class="size-guide">?
                        <div class="size-guide-pop">
                            <h3>Size guide</h3>
                            <div class="grid">
                                <span>Size chart (cm)</span><span>S</span><span>M</span><span>L</span>
                                <span>Chest</span><span>55</span><span>57</span><span>59.5</span>
                                <span>Shoulder to shoulder</span><span>45</span><span>46</span><span>48</span>
                                <span>Sleeve length</span><span>63</span><span>64.5</span><span>66</span>
                                <span>Bottom</span><span>54</span><span>56</span><span>59</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="size-container">
                    <span @click="activeSize(0)" :class="currentSize === 0 ? 'active' : ''">S</span>
                    <span @click="activeSize(1)" :class="currentSize === 1 ? 'active' : ''">M</span>
                    <span @click="activeSize(2)" :class="currentSize === 2 ? 'active' : ''">L</span>
                </div>
            </div>
            <div class="button-container">
                <FormButton class="callToAction" text="Add to cart" :iconIndex="1"/>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from '~~/stores/mainStore';
    import { useScreenHandler } from '~~/stores/ScreenHandler';
    
    const mainStore = useMainStore()
    const screenHandler = useScreenHandler()
    

    const route = useRoute()

    //Item base info
    const item = ref<object | any>(null)
    const itemName = ref('');
    const itemId = ref<number>(null);
    const descp = ref([])

    //Exclusions from showing in location
    const exclusions = [
        'Made-to-order collection',
        'Promotions',
        'T-shirts kit',
        'Vegan leather kit',
        'Caps',
        'Activewear & loungewear',
    ]

    //Get route and item info
    onMounted(() => {
        //Get productId
        let productId:any = route.params.productId;
        productId = productId.split('-')[productId.split('-').length - 1]
        itemId.value = parseInt(productId);


        //Get product Name
        let productName:any = route.params.productName
        productName = productName + '-' + route.params.productId

        productName = productName.slice(0, -productId.length - 1)
        productName = productName.replaceAll('-e-', '-&-')
        productName = productName.replaceAll('-', ' ');
        productName = productName.replaceAll('t shirt', 't-shirt');
        productName = productName.replaceAll('T shirt', 'T-shirt');
        productName = productName.replaceAll('Five panel', 'Five-panel');
        productName = productName.replaceAll('Roll top', 'Roll-top')
        itemName.value = productName;

        useHead({
            title: `Wetheknot | ${productName}`,
            meta: [
                {name: "title", content: `Wetheknot | ${productName}`},
                {name: "keywords", content: `${productName},cloth, fashion, wetheknot, durability, environment, friendly, unisex, reuse, recycle, simplicity, portuguese clothing, portugal, roupa portuguesa, roupa, unisexo, simplicidade, casacos, jackets, jeans, calças, soap`},
                {name: "description", content: "We from wetheknot are compromised with finding the perfect balance beetween environment and clothing manufactorying, keeping sustainability in mind for every product we design."},
                {name: "author", content: "Rodrigo Fernandes"}
            ]
        })

        if(mainStore.productDataIsLoaded) getItem()
    })

    watch(() => mainStore.productDataIsLoaded, (newValue, oldValue) => {
        if(newValue) getItem()
    });

    //Get current item
    function getItem() {
        mainStore.productList.forEach(element => {
            if(element.id === itemId.value && element.name === itemName.value) {
                item.value = element;
            }
        });

        if(!item.value) {
            return navigateTo({ path: '/',})
        }

        let sept = item.value.descp.split('.');

        const lastP = sept[sept.length - 2] + '.';


        descp.value.push(sept.slice(0, sept.length - 2).join('.'))
        descp.value.push(lastP)
        
    }

    ///Toggle active size
    const currentSize = ref(1);
    const activeSize = (size) => {
        currentSize.value = size;
    }

    //Get aspect ratio for container
    const ratio = ref(0);
    const aspectRatioContainer = ref(null);

    watch(aspectRatioContainer, async (newObj) => {
        setTimeout(function(){
            ratio.value = newObj.offsetWidth * 1.35;
        }, 200);
    })

    onMounted(() => {
        window.addEventListener('resize', recalculateRatio)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', recalculateRatio)
    })


    const recalculateRatio = () => {
        ratio.value = aspectRatioContainer.value.offsetWidth * 1.35;
    }

    //Image slider
    const currentImage = ref(0);
    const changeToImage = (imageIndex:number, isIncremental:boolean = false) => {
        if(!isIncremental) currentImage.value = imageIndex;
        else {
            let nextIndex = imageIndex + currentImage.value;

            if(nextIndex < 0) nextIndex = 1
            else if(nextIndex > 1) nextIndex = 0

            currentImage.value = nextIndex
        }
    }

    const imageError = ref(false)
    const imageFailedToLoad = () => {
        imageError.value = true;
    }
    
</script>

<style scoped lang="scss">
    #product-wrapper {
        display: grid;
        position: relative;
        min-height: 100vh;
        margin-top: 30px;
        margin-bottom: 120px;
        padding-inline: var(--pageMargins);

        grid-template-areas: 
            "image location"
            "image infos"
        ;

        grid-auto-rows: auto 1fr;
        grid-template-columns: 4.1fr 6fr;
        gap: 20px;

        &.isMobile {
            grid-template-areas: 
                "location"
                "image"
                "infos"
            ;
            grid-template-columns: 1fr;
        }

        //Children
        .image, .location, .info {
            display: block;
            position: relative;
            
        }

        //Image
        .image {
            grid-area: image;
            

            .image-wrapper {
                display: block;
                position: relative;
                width: 100%;
                height: calc(var(--ratio) * 1px);
                
                border-radius: 2%;
                overflow: hidden;

                img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: auto;
                    transition: .3s;

                    &:not(.active) {
                        opacity: 0;
                    }
                }

                .image-controls {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;

                    .btn-change-pic {
                        --dimensions: 20px;
                        display: block;
                        position: absolute;
                        width: var(--dimensions);
                        height: var(--dimensions);
                        top: calc(50% - var(--dimensions) / 2);
                        left: 20px;
                        border: 2.5px solid rgba(255, 255, 255, 0.7);
                        border-right: none;
                        border-bottom: none;
                        transform: rotate(-45deg);
                        cursor: pointer;
                        transition: .12s;

                        &.prev {
                            left: auto;
                            right: 20px;
                            transform: rotate(-225deg);
                        }

                        &:hover {
                            border-color: rgba(255, 255, 255, 0.9);;
                        }
                    }

                    .dot-controls {
                        display: flex;
                        justify-content: center;
                        position: absolute;
                        width: 100%;
                        height: 20px;
                        bottom: 30px;
                        gap: 10px;
                        
                        .pic-dot {
                            display: block;
                            position: relative;
                            width: 12px;
                            height: 12px;
                            border-radius: 100%;
                            background: rgba(255, 255, 255, 0.7);
                            cursor: pointer;
                            transition: .12s;

                            &.active {
                                width: calc(12px * 3.8);
                                border-radius: 20px;
                                background: rgba(255, 255, 255, 0.9);
                                cursor: default;
                            }

                            &:not(.active):hover {
                                background: rgba(255, 255, 255, 0.9);
                            }
                        }
                    }
                }

                &.error {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                    font-size: 22px;
                    color: rgb(250, 76, 76);
                    
                    .icon {
                        border: 12px solid rgb(250, 76, 76);
                        width: 50%;
                        aspect-ratio: 1 / 1;
                        border-radius: 100%;
                        margin-bottom: 28px;

                        &::before {
                            content: '';
                            display: block;
                            width: 105%;
                            height: 12px;
                            background: rgb(250, 76, 76);
                            transform-origin: center;
                            margin-top: calc(50% - 6px);
                            transform: rotate(60deg);
                        }
                    }
                }
            }
        }

        //Info
        .location {
            grid-area: location;
            
            font-weight: light;
            color: #4C4C4C;
            font-size: 1em;
            padding-bottom: .7em;

            span {
                cursor: pointer;
                transition: .12s;

                a {
                    text-decoration: none;
                    color: inherit;
                }

                &:not(:nth-child(1))::before {
                    content: ' - ';
                }

                &:not(:nth-last-child(1)):hover {
                    color: #000000;
                }

                &.currentItem {
                    font-weight: 500;
                    cursor: default;
                }
            }
            
        }

        //Location
        .info {
            grid-area: infos;

            .item-name {
                font-size: 2em;
                font-weight: bold;

            }

            .item-material {
                font-size: .9em;
                padding-top: 6px;
                color: rgb(71, 71, 71);
            }

            .prices {
                display: flex;
                font-size: 1.4em;
                margin-top: 30px;
                align-items: center;

                .old {
                    font-size: .8em;
                    color: #888888;
                    position: relative;
                    padding-right: 1.7em;

                    &::after {
                        content: '';
                        display: block;
                        width: 120%;
                        height: 2px;
                        background: #888888;

                        transform-origin: bottom left;

                        transform: rotate(-8deg) translateY(-8px);
                    }
                }

                .new {
                    color: #F94F44;
                }
            }

            .description {
                padding-top: 1.4em;
                font-weight: normal;
                font-size: 1.4em;
                line-height: 175%;

                p:nth-last-child(1) {
                    margin-top: 1em;
                }
            }

            .size-selector {
                margin-top: 3em;
                .text {
                    display: flex;
                    
                    h4 {
                        font-size: 1.4em;
                        font-weight: bold;
                    }

                    .size-guide {
                        display: block;
                        position: relative;
                        width: 1.3em;
                        height: 1.3em;
                        background: #cfe4ff;
                        text-align: center;
                        border-radius: 100%;
                        padding: 2px;
                        cursor: pointer;
                        margin-left: .4em;
                        transition: .12s;

                        &:hover {
                            background: var(--primaryColor);
                        }

                        h3 {
                            text-align: left;
                            padding-bottom: 12px;
                        }

                        &:hover {
                            .size-guide-pop {
                                transform: scale(100%);
                            }
                        }

                        .size-guide-pop {
                            position: absolute;
                            top: 0;
                            left: 120%;
                            width: auto;
                            height: auto;
                            -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.46); 
                            box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.46);
                            padding: .8em;
                            border-radius: 8px;
                            width: max-content;
                            
                            background: var(--bgColor);
                            z-index: 99;

                            transform-origin: top left;
                            transition: .12s;
                            transform: scale(0);

                            .grid {
                                display: grid;
                                grid-template-columns: auto 1fr 1fr 1fr;
                                gap: 50px;
                                row-gap: 15px;

                                span {
                                    text-align: left;
                                    
                                }
                            }
                            


                            &::before {
                                content: '';
                                display: block;
                                position: absolute;
                                top: 5px;
                                left: -3px;
                                width: 12px;
                                height: 12px;
                                background: var(--bgColor);
                                z-index: 1;

                                border-radius: 1px;

                                transform-origin: center;
                                transform: rotate(45deg);
                            }
                        }
                    }
                }

                .size-container {
                    display: flex;

                    span {
                        --ballSize: 2.6em;
                        display: block;
                        width: var(--ballSize);
                        height: var(--ballSize);
                        text-align: center;
                        line-height: var(--ballSize);
                        background: #DEDEDE;
                        border-radius: 100%;
                        cursor: pointer;
                        margin-top: 12px;
                        transition: .16s;

                        &:not(:nth-child(1)) {
                            margin-left: .8em;
                        }

                        &.active {
                            background: var(--primaryColor);
                        }
                    }
                }
            }
            .button-container {
                padding-top: 70px;
                transform: scale(90%) translateX(-5%);

            }
        }
    }

</style>