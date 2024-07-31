import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    productsFilter: [],
    users: [],
    token: null
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    }
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
    setToken(state, token) {
      state.token = token
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

        if(productName.includes(formatName)) {
          return product
        }
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
        })
        const data = await response.json()
        commit('setUsers', [...this.state.users, data])
      } catch (error) {
        console.log(error)
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
        commit('setToken', data.token)
      } catch (error) {
        console.log(error)
      }
    },
    async createProductAction({ commit }, { product, token }) {
      try {
        const response = fetch('https://market-place-app-xa82.onrender.com/api/v1/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify({ product })
        })
        const data = await response.json()
        commit('setProduct', [...this.state.products, data])
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {}
})
