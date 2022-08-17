<template>
    <div class="wraper">
        <cards-index-product-card img="/assets/products/soap.jpg" :transform="{x: 0, y: -15}" zoom="1.7" link="shop/Shampoo-bars" category="Shampoo bars" :hasArrow="true"/>
        <cards-index-product-card img="/assets/products/tshirt.jpg" link="shop/T-shirts-e-Long-sleeves" category="T-shirts & Long Sleeves" :hasArrow="true"/>
        <cards-index-product-card img="/assets/products/socks.jpg" :transform="{x: 0, y: -4}" zoom="1.3" link="shop/Card-holders" category="Socks" :hasArrow="true"/>
        <cards-index-product-card img="/assets/products/cap.jpg" zoom="1.35" :transform="{x: 0, y: -10}" link="shop/Caps-e-Scarves" category="Headwear" :hasArrow="true"/>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .wraper {
        display: grid;
        position: relative;
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(300px, 310px));
        justify-content: space-between;
        gap: 25px;

        padding: 120px var(--pageMargins);

        @media (min-width: 1040px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 1040px) {
            padding: 80px var(--pageMargins);
        }

        

        @media (max-width: 850px) {
            grid-template-columns: repeat(2, 1fr);
            padding: 30px var(--pageMargins);
        }
    }
</style>