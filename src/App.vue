<template>
  <div class="page-container">
    <img class="left-aligned-image" alt="Maerket Place App Logo" src="./assets/logo.png">
    <div class="container">
      <filterByName />
      <listProducts />
    </div>
  </div>
</template>

<script>
import ListProducts from '@/components/ListProducts'
import FilterByName from '@/components/FilterByName'

export default {
  name: 'App',
  components: {
    ListProducts,
    FilterByName
  }
}
</script>

<style lang="scss">
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
    margin: 5rem;
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
