<template>
    <div class="container" ref="cardContainer" >
        <cards-shop-card v-for="(card, i) in results" :key="i" v-if="mainStore.productDataIsLoaded"
    
            :name="card.name"
            :material="card.material"
            :cardH="cardHeight" 
            :currentPrice="parseFloat(card.currentprice)"
            :originalPrice="parseFloat(card.originalprice)" 
            :img="card.firstimg" 
            :hoverImg="card.secondimg"
            :updateSort="order"
            :updateCategory="currentFilter"
            :id="card.id"            
        />
        <div class="loading-items" v-else>
            <p>Loading items</p> <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <div class="not-results" v-if="results.length < 1">
            <p>Results not found</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMainStore } from '~~/stores/mainStore'
    const mainStore = useMainStore()

    const emit = defineEmits(['setInitialCategory'])

    const route = useRoute()
    const router = useRouter()

    const props = defineProps({
        filterByCategory: {
            type: Object,
            default: ''
        },
        sort: {
            type: String,
            default: ''
        }
    })


    const cardHeight = ref(500);
    const cardRatio = 1.5;
    const cardContainer = ref(null)

    

    let results = ref(mainStore.productList);
    let subCategory:any = '';
    
    //Make card height responsive
    let myObserver = null;
    onMounted(() => {      
        myObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const element:any = entry.target.querySelector(":nth-child(1)");
                if(element) cardHeight.value = element.offsetWidth * cardRatio;
            });
        });
        myObserver.observe(cardContainer.value);

        if(route.params.category) { //Get current rout filter
            subCategory = route.params.category;
            subCategory = subCategory.replaceAll('-e-', '-&-')
            subCategory = subCategory.replaceAll('-', ' ');
            subCategory = subCategory.replaceAll('T shirts', 'T-shirts');
            emit('setInitialCategory', subCategory);
        }
    })

    ////Check if slug for product category is set
    watch(() => mainStore.productDataIsLoaded, (newValue, oldValue) => {
        if(newValue && subCategory !== '') {
            currentFilter.value = subCategory;
            updateProductsDisplayed();
        }
    });

    onBeforeUnmount(() => {
        myObserver.unobserve(cardContainer.value);
    })

    ///Update product filters
    const order = ref('Latest')
    watch(() => props.sort, (newValue, oldValue) => {
        order.value = newValue;
        updateProductsDisplayed();
    });

    const currentFilter = ref('All products')
    watch(() => props.filterByCategory, (newValue, oldValue) => {
        currentFilter.value = newValue.receivedData;

        updateProductsDisplayed();
    });

   

    const updateProductsDisplayed = () => {
        let itemList = [...mainStore.productList]
        ///Filter by cat
        if(currentFilter.value !== 'All products' ) {
            const newArr = []
            itemList.filter((product) => {
                if(product.categories.includes(currentFilter.value)) {
                    newArr.push(product)
                }
            })

            itemList = newArr;
        }
        
        //Reorder 
        if(order.value === 'Oldest') {
            itemList.reverse();
        }
        
        results.value = itemList
    }

</script>

<style scoped lang="scss">
    .container {
        display: grid;
        grid-template-columns: repeat(4, minmax(150px, 350px));
        padding: 30px var(--pageMargins);
        padding-top: 0;
        justify-content: space-between;
        gap: 50px;

        @media (min-width: 1910px) {
            grid-template-columns: repeat(auto-fill, minmax(150px, 350px));
        }

        @media (max-width: 1000px) {
            grid-template-columns: repeat(2, minmax(150px, 200px));
        }

        @media (max-width: 600px) {
            grid-template-columns: repeat(2, minmax(120px, 180px));
        }

        .loading-items, .not-results {
            display: flex;
            justify-content: center;
            align-items: center;
            grid-column: 1 / -1;
            --size: 1.5em;

            @media (max-width: 1100px) {
                --size: 1em;

            }

            p {
                text-align: center;
                font-size: var(--size);
                font-weight: 300;
                text-decoration: uppercase;
                letter-spacing: 4%;
            }

            .lds-ring {
                display: inline-block;
                position: relative;
                width: var(--size);
                height: var(--size);
                margin-left: 15px;

                div {
                    box-sizing: border-box;
                    display: block;
                    position: absolute;
                    width: var(--size);
                    height: var(--size);
                    margin: 0px;
                    border: 4px solid rgb(0, 0, 0);
                    border-radius: 50%;
                    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                    border-color: rgb(0, 0, 0) transparent transparent transparent;

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
        }
    }
</style>