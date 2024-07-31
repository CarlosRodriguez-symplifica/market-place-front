<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
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

      const login = () => {
        const payload = {
          email: email.value,
          password: password.value
        }
        store.dispatch('loginUser', payload)
      }

      return {
        email,
        password,
        login
      }
    }
  }
  </script>

  <style scoped>
  .login {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
