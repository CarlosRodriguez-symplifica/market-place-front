<template>
  <div class="app-container">
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
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
    background: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: var(--text-orange);
  }
  .login h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
  .login form div {
    margin-bottom: 1rem;
  }
  .login label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .login input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .login button {
    width: 100%;
    padding: 0.75rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .login button:hover {
    background: var(--text-orange);
  }
</style>
