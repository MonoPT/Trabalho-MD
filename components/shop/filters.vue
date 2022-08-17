<template>
    <div class="filters">
        <div class="filter">
            <span>Filter by:</span>
            <formSelect class="select" emitName="filter" @dataUpdate="ReceivecallbackSelect" :initialValue="initialCategoryRef" :updateUrl="true">
                <option v-for="(category, i) in mainStore.productCategories" :value="i" :key="i">{{category}}</option>
            </formSelect>
        </div>

        <div class="filter">
            <span>Sort:</span>
            <formSelect class="select" emitName="sort" @dataUpdate="ReceivecallbackSelect">
                <option value="0">Latest</option>
                <option value="1">Oldest</option>
            </formSelect>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from '~~/stores/mainStore'
    const mainStore = useMainStore()

    const emit = defineEmits(['dataUpdate'])

    const ReceivecallbackSelect = (emitedData) => {
        emit('dataUpdate', emitedData);
    }

    const initialCategoryRef = ref('')

    const props = defineProps({
        initialCategory: {
            type: String,
            required: false,
            default: ''
        }
    })

    watch(() => props.initialCategory, (newValue, oldValue) => {
        initialCategoryRef.value = newValue;
    });

</script>

<style scoped lang="scss">
    .filters {
        display: flex;
        flex-direction: row-reverse;
        padding: 60px var(--pageMargins);
        font-size: 1.3em;
        font-weight: 350;

        @media (max-width: 1000px) {
            font-size: 1.15em;
        }

        @media (max-width: 950px) {
            flex-direction: row;
            padding: 25px var(--pageMargins);

            .filter {
                &:first-of-type {
                    margin-left: 0;
                }

                &:last-of-type {
                    margin-left: auto;
                }
            }
        }

        @media (max-width: 800px) {
            font-size: .95em;
        }

        @media (max-width: 580px) {
            font-size: .85em;
        }

    

        .filter {
            position: relative;
            margin-left: 80px;
            display: flex;
            width: auto;

            span {
              color: rgb(140, 140, 140);  
            }
            

            .select {
                margin-left: 12px;
                color: #000;
            }
        }
    }
</style>