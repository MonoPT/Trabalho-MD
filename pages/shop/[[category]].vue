<template>
    <div class="Content">
        <shopFilters @dataUpdate="ReceivefiltersData" :initialCategory="initialCategory"/>
        <shop-product-displace :sort="sort" :filterByCategory="filterByCategory"  @setInitialCategory="updateInitialCategory"/>
    </div>
</template>

<script setup lang="ts">
    useHead({
        title: 'Wetheknot | Shop',
        meta: [
            {name: "keywords", content: "cloth, fashion, wetheknot, durability, environment, friendly, unisex, reuse, recycle, simplicity, portuguese clothing, portugal, roupa portuguesa, roupa, unisexo, simplicidade, casacos, jackets, jeans, calças, soap"},
            {name: "description", content: "We from wetheknot are compromised with finding the perfect balance beetween environment and clothing manufactorying, keeping sustainability in mind for every product we design."},
            {name: "author", content: "Rodrigo Fernandes"}
        ]
    })

    const route = useRoute()


    const sort = ref(null);
    const filterByCategory = ref(null)
    let routeParam = '';
    let selectChangedParam = '';
    let updatedParamCounter = 0;
    let hasUpdatedFirstTime = false;

    const ReceivefiltersData = (receivedData) => {
        if(receivedData.emitEventName === 'sort') sort.value = receivedData.value;
        else if(receivedData.emitEventName === 'filter') {
            filterByCategory.value = {receivedData: receivedData.value, updateUrl: receivedData.updateUrl}
            selectChangedParam = receivedData.value;
        }
        

        if(receivedData.updateUrl) {
            history.pushState(
                {},
                null,
                `/shop/${encodeURIComponent(receivedData.value.replaceAll(' ', '-').replaceAll('&', 'e'))}`
            );

            
        }
        
        updatedParamCounter = 0;
    }


    const initialCategory = ref('')

    const updateInitialCategory = (data) => {
        initialCategory.value = data
    }

    onUpdated(async () => {
        await nextTick()
        let newSubCat:any = '';
        newSubCat = route.params.category;
        newSubCat = newSubCat.replaceAll('-e-', '-&-')
        newSubCat = newSubCat.replaceAll('-', ' ');
        newSubCat = newSubCat.replaceAll('T shirts', 'T-shirts');


        if(selectChangedParam != '' && hasUpdatedFirstTime && updatedParamCounter === 0) {
            newSubCat = selectChangedParam;
        }

        if((filterByCategory.value.receivedData !== newSubCat && newSubCat !== '')) {
            filterByCategory.value = {receivedData: newSubCat, updateUrl: false}
            initialCategory.value = newSubCat;
            

            updatedParamCounter++;

            if(updatedParamCounter > 2) {
                updatedParamCounter = 0;
                selectChangedParam = '';
            }
        }
        
        hasUpdatedFirstTime = true;
    })

</script>

<style scoped>
    .Content {
        min-height: 100vh;
    }
</style>