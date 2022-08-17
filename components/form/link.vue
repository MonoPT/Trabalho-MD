<template>
    <NuxtLink :to="linkTo" class="link" :style="`--hoverColor: ${hoverColor}; --underlineColor: rgb(255,255,255)`" :class="`${hasArrow ? 'hasArrow' : '' }`">
        <span ref="linkElement" :class="isBold ? 'bold' : ''">{{text}} <img src="@/assets/icons/arrow.svg" alt="" v-if="hasArrow" class="arrow"></span>
    </NuxtLink>
</template>

<script setup lang="ts">
    defineProps({
        text: {
            type: String,
            required: true,
        },
        linkTo: {
            type: String,
            required: true,
        },
        isBold: {
            type: Boolean,
            required: false,
            default: false
        },
        hasArrow: {
            type: Boolean,
            required: false,
            default: false
        }
    })

    const linkElement = ref(null);
    const hoverColor = ref<string>("#fff")
    const underlineColor = ref<string>('');

    onMounted(() => {
        //console.log(linkElement.value.getAttribute('color'))
        const currentColor = window.getComputedStyle(linkElement.value).getPropertyValue('color');
        underlineColor.value = currentColor;
        //hoverColor.value = LightenDarkenColor(currentColor, -100);
        hoverColor.value = LightenDarkenColorRGB(currentColor, {
            amt: -30
        })
    })

    function LightenDarkenColorRGB(currentColor,{ amt= 0, rgb = {r:0,g:0,b:0}}) {
        const colorSet = currentColor.substring(4, currentColor.length - 1).replaceAll(' ', '').split(',');
        const Currentcolor = {
            r: colorSet[0],
            g: colorSet[1],
            b: colorSet[2]
        }
        
        ///Get color change
        const colorChangeInRGB = (rgb.r >0 || rgb.g >0 || rgb.b >0 ) ? rgb : {r: amt, g: amt, b: amt}
        
        const newColor = Currentcolor
        newColor.r = parseInt(newColor.r) + colorChangeInRGB.r;
        newColor.g = parseInt(newColor.g) + colorChangeInRGB.g;
        newColor.b = parseInt(newColor.b) + colorChangeInRGB.b;

        for (const key in Currentcolor) {
            if(Currentcolor[key] > 255) {
                Currentcolor[key] = 255;
            } else if(Currentcolor[key] < 0) {
                Currentcolor[key] = 0;
            }
        }

        return `rgb(${newColor.r},${newColor.g},${newColor.b})`;
    }

</script>

<style scoped lang="scss">
    .link {
        text-decoration: none;
        color: inherit;
        transition: .12s;

        &:hover {
            color: var(--hoverColor);

            span {
                &::after {
                    background-color: var(--hoverColor);
                }
            }
        }

        &.hasArrow {
            span {
               &::after {
                    width: calc(101% + 1em)
                } 
            }
        }

        span {
            position: relative;

            &.bold {
                font-weight: 500;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                width: 94%;
                height: 1px;
                background-color: var(--underlineColor);
                bottom: 2px;
                left: 0;
                transition: .12s;
            }

            .arrow {
                display: block;
                position: absolute;
                right: -1em;
                bottom: -1em;
                height: 1em;
                width: auto;
                filter: invert(1);
                transform: translateY(calc(
                    -50% - 1em / 2 - 2px
                ));
            }
        }
    }
</style>