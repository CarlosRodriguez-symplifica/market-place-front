<template>
    <div class="create-product">
      <h2>Crear Producto</h2>
      <form @submit.prevent="createProduct">
        <div>
          <label for="title">Título:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div>
          <label for="price">Precio:</label>
          <input type="number" id="price" v-model="price" required />
        </div>
        <div>
          <label for="published">Publicado:</label>
          <input type="checkbox" id="published" v-model="published" />
        </div>
        <div>
          <label for="quantity">Cantidad:</label>
          <input type="number" id="quantity" v-model="quantity" required />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  </template>

  <script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data() {
      return {
        title: '',
        price: '',
        published: false,
        quantity: 0
      }
    },
    computed: {
      ...mapState(['token'])
    },
    methods: {
      ...mapActions(['createProductAction']),
      createProduct() {
        const product = {
          title: this.title,
          price: this.price,
          published: this.published,
          quantity: this.quantity
        }
        this.createProductAction({ product, token: this.token })
      }
    }
  }
  </script>

  <style scoped>
  .create-product {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .create-product h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
  .create-product form div {
    margin-bottom: 1rem;
  }
  .create-product label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .create-product input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .create-product button {
    width: 100%;
    padding: 0.75rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .create-product button:hover {
    background: #0056b3;
  }
  </style>
