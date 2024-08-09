import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    productsFilter: [],
    users: [],
    flashMessage: null,
    token: localStorage.getItem('token') || null
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    isAuthenticated: (state) => !!state.token,
    flashMessage: (state) => state.flashMessage
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setProductsFilter(state, payload) {
      state.productsFilter = payload
    },
    setUsers(state, payload) {
      state.users = payload
    },
    setFlashMessage(state, { message, type }) {
      state.flashMessage = { message, type }
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    removeToken(state) {
      state.token = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const response = await fetch('https://market-place-app-xa82.onrender.com/api/v1/products')
        const data = await response.json()
        commit('setProducts', data.data)
        commit('setProductsFilter', data.data)
        commit('setUsers', data.included)
      } catch (error) {
        console.error(error)
      }
    },
    filterByName({ commit, state }, name) {
      const formatName = name.toLowerCase()

      const results = state.products.filter((product) => {
        const productName = product.attributes.title.toLowerCase()

        return productName.includes(formatName)
      })
      commit('setProductsFilter', results)
    },
    async registerUser({ commit }, payload) {
      try {
        const response = await fetch('https://market-place-app-xa82.onrender.com/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              email: payload.email,
              password: payload.password
            }
          })
        });
        const data = await response.json();

        if (response.ok) {
          commit('setFlashMessage', { message: 'Registro exitoso...', type: 'success' })
          return { success: true }
        } else {
          commit('setFlashMessage', { message: data.email[0] || 'Error en el registro', type: 'error' })
          return { success: false }
        }
      } catch (error) {
        console.error('Error al registrar:', error)
        commit('setFlashMessage', { message: 'Error en la solicitud', type: 'error' })
        return { success: false }
      }
    },
    async loginUser({ commit }, payload) {
      try {
        const response = await fetch('https://market-place-app-xa82.onrender.com/api/v1/tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              email: payload.email,
              password: payload.password
            }
          })
        })
        const data = await response.json()

        if (response.ok) {
          commit('setToken', data.token)
          commit('setFlashMessage', { message: 'Inicio de sesión exitoso', type: 'success' })
          return { success: true }
        } else {
          console.log('entro aqui')
          commit('setFlashMessage', { message: 'Error en el inicio de sesión', type: 'error' })
          return { success: false }
        }
      } catch (error) {
        console.log(error)
        commit('setFlashMessage', { message: 'Error en la solicitud', type: 'error' })
        return { success: false }
      }
    },
    logout({ commit }) {
      commit('removeToken')
      commit('setFlashMessage', { message: 'Sesión cerrada', type: 'success' })
    },
    async createProductAction({ commit, state }, { product, token }) {
      try {
        const response = await fetch('https://market-place-app-xa82.onrender.com/api/v1/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify({ product })
        })
        const data = await response.json()
        console.log(response)
        console.log(data)
        if (response.ok) {
          commit('setProducts', [...state.products, data])
          commit('setFlashMessage', { message: 'Producto creado exitosamente', type: 'success' })
        } else {
          commit('setFlashMessage', { message: 'Error al crear el producto', type: 'error' })
        }
      } catch (error) {
        console.log('Error al crear el producto:', error)
        commit('setFlashMessage', { message: 'Error en la solicitud', type: 'error' })
      }
    }
  },
  modules: {}
})
