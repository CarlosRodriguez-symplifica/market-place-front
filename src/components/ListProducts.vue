<template>
  <section>
    <div class="products">
        <div class="products__item" v-for="product in products" :key="product.id">
            <CardProduct :product="product"/>
        </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore} from 'vuex'

import CardProduct from '@/components/CardProduct'

export default {
    components: {
        CardProduct
    },
    setup() {
        const store = useStore()
        const products = computed(() => {
            return store.state.productsFilter
        })

        onMounted(() => {
            store.dispatch('getProducts')
        })

        return {
            products
        }
    }
}
</script>

<style>
    .products {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        margin: 3rem 0;
    }
</style>
