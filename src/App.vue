<template>
  <div class="page-container">
    <Register />
    <Login />
    <CreateProduct />
    <img class="left-aligned-image" alt="Maerket Place App Logo" src="./assets/logo.png">
    <filterByName />
    <div class="container">
      <listProducts />
    </div>
  </div>
</template>

<script>
import Register from '@/components/Register'
import Login from '@/components/Login'
import CreateProduct from './components/CreateProduct.vue'
import ListProducts from '@/components/ListProducts'
import FilterByName from '@/components/FilterByName'

export default {
  name: 'App',
  components: {
    Register,
    Login,
    CreateProduct,
    ListProducts,
    FilterByName
  }
}
</script>

<style
    CreateProductlang="scss">
  :root {
    --background-body: #CFCFCF;
    --background-card: #3C3E44;
    --background-card-shadown: #5b5b5b;
    --text-white: #FFFFFF;
    --text-gray: #c0c0c0;
    --text-orange: #FF9800;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background-color: var(--background-body);
    color: var(--text-white);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  h1 {
    margin-bottom: 3rem;
    text-align: center;
  }
  .container {
    width: auto;
    max-width: 90%;
    margin: 5rem auto;
  }
  .product_img {
    width: 100%;
  }
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;
    padding: 20px;
  }
  .left-aligned-image {
    max-width: 100%;
    height: auto;
  }
</style>
