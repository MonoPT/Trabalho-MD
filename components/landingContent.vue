<template>
    <div class="landing-section">
        <div class="text">
            <p>Being sustainable is about making informed decisions, bearing in mind how they will impact others.</p>
            <div class="wrapper">
                <FormButton class="callToAction" @click="testGtag"/>
            </div>
        </div>
        <div class="graph">
            <img src="@/assets/man.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
    const testGtag = () => {
        gtag('event','CallToAction', {
        'event_category': 'clicked_btn',
        'event_label':'Clicked on the call to action button',
        'value': 1
        });
        console.log("sended")
    }
</script>

<style scoped lang="scss">
    .landing-section {
        display: grid;
        width: 100%;
        height: calc(100vh - 70px);
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
        min-height: 700px;

        @media (max-width: 1090px) {
            grid-template-columns: 1fr
        }

        .graph {
            position: relative;
            z-index: 1;

            &::before {
                content: '';
                display: block;
                position: absolute;
                bottom: 0;
                width: 150%;
                height: 60%;
                background: var(--thirdColor);
                transform: rotate(-35deg);
            }

            img {
                width: 85%;
                height: auto;
                position: absolute;
                bottom: 0;
                right: 0;
                pointer-events: none;

                @media (max-width: 1400px) {
                    width: 110%;
                }

                @media (max-width: 1100px) {
                    width: 140%;
                    
                }

                @media (max-width: 1090px) {
                    width: 80%;
                    
                }

                @media (max-width: 820px) {
                    width: 100%;
                    transform: translateX(20%);
                }

                @media (max-width: 700px) {
                    width: 120%;
                }

                @media (max-width: 550px) {
                    width: 140%;
                }

                @media (max-width: 440px) {
                    width: 160%;
                    transform: translateX(20%);
                }

                 
            }
        }

        .text {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 2;
            padding-left: var(--pageMargins);

            @media (max-width: 1055px) {
                align-items: flex-start;
                justify-content: flex-start;
                position: absolute;
                top: 50px;
                left: 0;
                width: 100%;
                height: calc(100% - 150px);
                margin-top: 50px;
            }

        

          

            
            p {
                font-size: 2.8em;
                font-weight: 200;
                line-height: 175%;

                @media (max-width: 1400px) {
                    font-size: 1.9em;
                    line-height: 175%;
                } 

                @media (max-width: 1090px) {
                    display: inline-block;
                    width: 90%;
                }

                @media (max-width: 966px) {
                    font-size: 1.7em;
                    line-height: 165%;
                } 

                @media (max-width: 700px) {
                    font-size: 1.5em;
                    line-height: 155%;
                } 

                @media (max-width: 500px) {
                    font-size: 1.3em;
                    line-height: 135%;
                } 
                
            }

            .wrapper {
                width: 100%;

                @media (max-width: 1055px) {
                    margin-top: auto;
                }

                .callToAction {
                    margin-top: 95px;
                    display: inline-block;
                    
                }
            }
        }
        
    }
</style>