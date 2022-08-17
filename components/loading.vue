<template>
    <div id="loading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <span>Loading</span>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    #loading {
        position: fixed;
        z-index: 300;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: 1.9em;
        flex-direction: column;
        background-color: var(--primaryColor);
        pointer-events: none;

        .lds-ring {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;

            div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 90px;
                height: 90px;
                margin: 0px;
                border: 8px solid #fff;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: #fff transparent transparent transparent;

                &:nth-child(1) {
                    animation-delay: -0.45s;
                }

                &:nth-child(2) {
                    animation-delay: -0.3s;
                }

                &:nth-child(3) {
                    animation-delay: -0.15s;
                }
            }

            @keyframes lds-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
                
        

        span {
            margin-top: 28px;
            text-transform: uppercase;
            letter-spacing: 15%;
            color: #fff;
        }

    }
</style>