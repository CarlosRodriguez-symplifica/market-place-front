<template>
  <div class="product-detail" v-if="product">
    <div class="product-detail__image">
      <img :src="imageSrc" :alt="product.title" />
    </div>
    <div class="product-detail__info">
      <h1>{{ product.title }}</h1>
      <p class="product-detail__price">Precio: ${{ product.price }}</p>
      <p class="product-detail__stock">
        Cantidad en bodega:
        <span v-if="product.quantity === 0">Sin stock</span>
        <span v-else>{{ product.quantity }} {{ product.quantity === 1 ? 'unidad' : 'unidades' }}</span>
      </p>
      <button @click="goBack" class="btn btn--secondary">Volver</button>
    </div>
  </div>
  <div v-else class="loading">Cargando...</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import exampleImage from '@/assets/no_imag.jpg'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const product = ref(null)

    const fetchProduct = async () => {
      const id = route.params.id
      await store.dispatch('fetchProductById', id)
      product.value = store.state.currentProduct
    }

    const goBack = () => {
      router.back()
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      product: computed(() => product.value),
      imageSrc: computed(() => exampleImage),
      goBack
    }
  }
}
</script>

<style scoped>
  .product-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 40px auto;
  }
  .product-detail__image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .product-detail__info {
    text-align: center;
    margin-top: 1rem;
    color: var(--text-orange)
  }
  .product-detail__price {
    font-size: 1.5rem;
    color: #333;
  }
  .product-detail__stock,
  .product-detail__published {
    font-size: 1rem;
    color: #666;
  }
  .product-detail__stock span {
    font-weight: bold;
  }
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }
  .btn--secondary {
    margin-top: 30px;
    background-color: var(--text-orange);
    color: white;
  }
  .btn--secondary:hover {
    background-color: #e0e0e0;
    color: var(--text-orange);
  }
  .loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.25rem;
    color: #666;
  }
</style>
