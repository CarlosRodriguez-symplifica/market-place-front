<template>
  <nav>
    <img class="left-aligned-image" alt="Maerket Place App Logo" src="./assets/logo.png">
    <div class="nav-links">
      <router-link to="/">Inicio</router-link>
      <router-link v-if="!isAuthenticated" to="/register">Registrarse</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="isAuthenticated" to="/create-product">Crear Producto</router-link>
      <button v-if="isAuthenticated" @click="logoutAndRedirect">Cerrar Sesion</button>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters.isAuthenticated)

    const logoutAndRedirect = async () => {
      try {
        await store.dispatch('logout')
        router.push('/')
      } catch (error) {
        console.error('Error during logout:', error)
      }
    }

    return {
      isAuthenticated,
      logoutAndRedirect
    }
  }
}
</script>

<style
    CreateProductlang="scss">
  :root {
    --background-body: #CFCFCF;
    --background-navbar: #f0f0f0;
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
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background-navbar);
    padding: 10px;
  }
  nav a {
    font-weight: bold;
    color: #3C3839;
    text-decoration: none;
    margin: 0 5px;
  }
  nav a.router-link-exact-active {
    color: var(--text-orange);
  }
  .left-aligned-image {
    max-width: 150px;
    height: auto;
  }
  .nav-links {
    display: flex;
    gap: 10px;
  }
  .app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    background-color: var(--background-body);
  }
</style>
