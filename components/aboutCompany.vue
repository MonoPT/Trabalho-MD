<template>
    <div class="area">
        <div class="column1">
            <p>wetheknot is a Portuguese slow fashion brand based in Lisbon. Our collections feature unisex and long-lasting items for everyday life, offering a sustainable alternative to social and environmental issues linked to the industry.</p>
            <p class="more">Know more about our <formLink text="philosophy" linkTo="#" /> and follow us on <formLink text="Instagram" linkTo="#" />.</p>
        </div>
        <div class="column2">
            <p>All our pieces are ethically made in Portugal with high-quality sustainable materials by local partners. Their expertise guarantees the best quality and durability, creating pieces meant to be used for years to come.</p>
            <p class="more">Find more about the <formLink text="People" linkTo="#" /> we work with. </p>
        </div>
        
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .area {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 60px var(--pageMargins);
        background-color: var(--primaryColor);
        width: 100%;
        gap: 30%;

        color: #fff;
        font-size: 1.2em;
        font-weight: 300;
        line-height: 170%;

        @media (max-width: 880px) {
          grid-template-columns: 1fr;  
          gap: 0;
        }

        .column1, .column2 {
            display: inline-grid;
            grid-template-rows: 1fr auto;
            gap: 15px;

            
        }

        .column2 {
            @media (max-width: 880px) {
                margin-top: 65px;
            }
        }

        p{
            @media (max-width: 880px) {
                font-size: .8em;    
            }

            &.more {
                margin-top: 18px;
                font-size: .7em;
                line-height: 132%;

                @media (max-width: 880px) {
                    margin-top: 5px;   
                    font-size: .6em;
                }       
            }
        }
    }
</style>