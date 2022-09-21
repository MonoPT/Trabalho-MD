import { defineStore } from 'pinia'
import productData from '../assets/productList.json'

export const useMainStore = defineStore('useMainStore', () => {
    const appIsLoaded = ref(false)
    onMounted(() => {
        appIsLoaded.value = true;  
    }) 
    
    onBeforeMount(() => {
        getItems();
    })

    


    const productDataIsLoaded = ref(false);
    const productCategories = reactive([])
    const productList = reactive([])

    function getItems() {
        const result = JSON.stringify(productData);
        const data = JSON.parse(result);

        
        Object.assign(productList, data)
        productDataIsLoaded.value = true;

        let cats = []
        data.forEach(product => {
            const newArr = [];
            for (const cat in product.categories) {
                newArr.push(product.categories[cat])
            }

            product.categories = [...newArr]
            
            cats.push(...product.categories)
        });
        
   
        cats = Array.from(new Set(cats))
        cats = cats.sort((a, b) => a.localeCompare(b));
        cats.unshift("All products");
        Object.assign(productCategories, cats)

        return data
    }

    const itemsOrder = ref(0);
    
    return { 
        appIsLoaded,
        productList,
        productDataIsLoaded,
        productCategories,
        itemsOrder
    }
})