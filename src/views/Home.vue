<template>
  <div v-if="flashMessage" :class="['flash-card', flashMessage.type]">
    {{ flashMessage.message }}
  </div>
  <div class="page-container">
    <CreateProduct />
    <filterByName />
    <div class="container">
      <listProducts />
    </div>
  </div>
</template>

<script>
import CreateProduct from '@/components/CreateProduct'
import ListProducts from '@/components/ListProducts'
import FilterByName from '@/components/FilterByName'
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  components: {
    // CreateProduct,
    ListProducts,
    FilterByName
  },
  setup() {
    const flashMessage = ref(null)

    onMounted(() => {
      const query = window.location.search
      const params = new URLSearchParams(query)
      const message = params.get('message')
      const type = params.get('type')

      if (message && type) {
        flashMessage.value = { message, type}

        setTimeout(() => {
          flashMessage.value = null
        }, 4000)
      }
    })
    return {
      flashMessage
    }
  }
}
</script>

<style
    CreateProductlang="scss">
  .page-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      height: 100vh;
      padding: 20px;
  }
  .container {
      width: auto;
      max-width: 90%;
      margin: 1rem auto;
  }
  h1 {
      margin-bottom: 3rem;
      text-align: center;
  }
  .product_img {
      width: 100%;
  }
  .flash-card {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 4px;
    text-align: center;
    transition: opacity 0.5s ease-in-out;
  }
  .flash-card.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  .flash-card.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
</style>
