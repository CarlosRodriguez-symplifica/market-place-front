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

      if (message) {
        setTimeout(() => {
          state.flashMessage = null
        }, 4000)
      }
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
        const response = await fetch(`${process.env.VUE_APP_MARKET_PLACE_APP_API_URL}/products`)
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
        const response = await fetch(`${process.env.MARKET_PLACE_APP_API_URL}/users`, {
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
          commit('setFlashMessage', { message: 'Bienvenido a Market Place App, ¡ya puedes iniciar sesion!', type: 'success' })
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
        const response = await fetch(`${process.env.MARKET_PLACE_APP_API_URL}/tokens`, {
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
        const responseText = await response.text()

        if (!response.ok) {
          let errorMessage = 'Error en el inicio de sesion'

          if (response.status === 401) {
            errorMessage = 'Credenciales incorrectas, intentalo de nuevo'
          } else if (response.status >= 500) {
            errorMessage = 'Error en el servidor. Intente mas tarde.'
          }

          if (responseText) {
            try {
              const errorData = JSON.parse(responseText)
              console.log('*************************')
              console.log(response)
              console.log(errorData)
              console.log('*************************')
            } catch (parseError) {
              console.log('No se pudo parsear el cuerpo de la respuesta:', responseText)
            }
          } else {
            console.log('La respuesta no tiene cuerpo.')
          }

          commit('setFlashMessage', { message: errorMessage, type: 'error' })
          return { success: false }
        }
        const data = JSON.parse(responseText)

        commit('setToken', data.token)
        commit('setFlashMessage', { message: `Bienvendido de nuevo ${data.email}`, type: 'success' })
        return { success: true }
      } catch (error) {
        commit('setFlashMessage', { message: 'Error en la solicitud', type: 'error' })
        return { success: false }
      }
    },
    logout({ commit }) {
      commit('removeToken')
      commit('setFlashMessage', { message: '¡Gracias!, Hasta luego', type: 'success' })
    },
    async createProductAction({ commit, state }, { product, token }) {
      try {
        const response = await fetch(`${process.env.MARKET_PLACE_APP_API_URL}/products`, {
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
