import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    products: [],
    categories: [],
    carts: []
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    GETPRODUCTS (state, products) {
      state.products = products
    },
    GETCATEGORIES (state, products) {
      const categories = new Set()
      products.forEach((item) => {
        categories.add(item.category)
      })
      state.categories = Array.from(categories)
    },
    GETCARTS (state, carts) {
      state.carts = carts
    }
  },
  actions: {
    updateLoading (contaxt) {
      contaxt.commit('LOADING', status)
    },
    getProducts (contaxt) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/products/all`
      contaxt.commit('LOADING', true)
      axios.get(url).then((response) => {
        contaxt.commit('GETPRODUCTS', response.data.products)
        contaxt.commit('GETCATEGORIES', response.data.products)
        contaxt.commit('LOADING', false)
      })
    },
    getCarts (contaxt) {
      contaxt.commit('LOADING', true)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart`
      axios.get(url).then((response) => {
        contaxt.commit('GETCARTS', response.data.data.carts)
        contaxt.commit('LOADING', false)
      })
    },
    addtoCart (contaxt, id, qty = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart`
      contaxt.commit('LOADING', true)
      const item = {
        product_id: id,
        qty
      }
      axios.post(url, { data: item }).then((response) => {
        if (response.success) {
          contaxt.commit('LOADING', false)
        }
      })
    }
  },
  modules: {
  }
})
