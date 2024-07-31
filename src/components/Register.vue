<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>

  <script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'

  export default {
    setup() {
      const store = useStore()
      const email = ref('')
      const password = ref('')

      const register = () => {
        const payload = {
          email: email.value,
          password: password.value
        }
        store.dispatch('registerUser', payload)
      }

      return {
        email,
        password,
        register
      }
    }
  }
  </script>

  <style scoped>
  .register {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
