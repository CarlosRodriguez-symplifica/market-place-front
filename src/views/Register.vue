<template>
  <div v-if="flashMessage" :class="['flash-card', flashMessage.type]">
    {{ flashMessage.message }}
  </div>
  <div class="app-container">
    <div class="register">
      <h2>Registrate</h2>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const flashMessage = ref(null)

    const register = async () => {
      const payload = {
        email: email.value,
        password: password.value
      }
      const response = await store.dispatch('registerUser', payload)

      if (response.success) {
        router.push({
          name: 'Home',
          query: { message: 'Registro exitoso', type: 'success' }
        })
      } else {

      }
    }

    store.watch(
      (state) => state.flashMessage,
      (newFlashMessage) => {
        flashMessage.value = newFlashMessage
        if (newFlashMessage) {
          setTimeout(() => {
            flashMessage.value = null
          }, 4000)
        }
      }
    )

    return {
      email,
      password,
      register,
      flashMessage
    }
  }
}
</script>

<style scoped>
  .register {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: var(--text-orange);
  }
  .register h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
  .register form div {
    margin-bottom: 1rem;
  }
  .register label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .register input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .register button {
    width: 100%;
    padding: 0.75rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .register button:hover {
    background: var(--text-orange);
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
