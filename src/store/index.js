import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    productsFilter: [],
    users: []
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
    }
  },
  actions: {
    async getProducts({commit}) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/products')
        const data = await response.json()
        commit('setProducts', data.data)
        commit('setProductsFilter', data.data)
        commit('setUsers', data.included)
      } catch (error) {
        console.error(error)
      }
    },
    filterByName({commit, state}, name) {
      const formatName = name.toLowerCase()

      const results = state.products.filter((product) => {
        const productName = product.attributes.title.toLowerCase()

        if(productName.includes(formatName)) {
          return product
        }
      })
      commit('setProductsFilter', results)
    }
  },
  modules: {
  }
})
