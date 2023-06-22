<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
          <a class="navbar-brand" href="#">My Store</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                  <li class="nav-item"><RouterLink class="nav-link active" aria-current="page" to="/">Produits</RouterLink></li>
                  <li class="nav-item"><RouterLink class="nav-link" to="/accueil">Accueil</RouterLink></li>
                  <li class="nav-item"><RouterLink class="nav-link" :to="{name: 'add-product'}">Add</RouterLink></li>
              </ul>
                  <!-- <button class="btn btn-outline-dark" @click="toggleSideBar">
                      <i class="bi-cart-fill me-1"></i>
                      Cart
                      <span class="badge bg-dark text-white ms-1 rounded-pill">{{ totalQuantity }}</span>
                  </button> -->
          </div>
      </div>
  </nav>
  <!-- Header-->
  <header class="bg-primary py-5 text-white">
      <!-- <div class="container px-4 px-lg-5 my-5">
        <div class="text-center">
          <h1 class="display-4 fw-bold text-uppercase">Discover Amazing Deals</h1>
          <p class="lead fw-normal text-white-50 mb-0">Experience the best shopping experience</p>
        </div>
      </div> -->
    </header>
  <RouterView
  :inventory="inventory"
  :add="addToCart"
  :addInv="addInventory"
  :actualiser="refreshData"
  />
  <Sidebar
  v-if="showSideBar"
  :toggle="toggleSideBar"
  :cart="cart"
  :inventory="inventory"
  :remove="removeItem"
  />
  <!-- Footer-->
  <footer class="py-5 bg-dark">
      <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2021</p></div>
  </footer>
</template>

<script>
import '@/assets/css/comp.css'
import Sidebar from '@/components/SideBar.vue'
import ProductDataService from '@/services/ProductDataService'
export default {
  components: {
    Sidebar
  },
  data () {
    return {
      showSideBar: false,
      inventory: [],
      cart: {}
    }
  },
  methods: {
    toggleSideBar () {
      this.showSideBar = !this.showSideBar
    },
    addToCart (product, index) {
      if (!this.cart[product]) this.cart[product] = 0
      this.cart[product] += this.inventory[index].quantity
      console.log(this.cart[product])
    },
    removeItem (name) {
      delete this.cart[name]
    },
    addInventory (data) {
      this.inventory.push(data)
    },
    test () {
      console.log('test')
    },
    refreshData () {
      ProductDataService.getAll()
        .then(response => {
          this.inventory = response.data
        })
    }
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    }
  },
  watch: {
    '$route' () {
      console.log(this.$route.name)
      if (this.$route.name === 'home') {
        this.refreshData()
      }
    }
  },
  mounted () {
    this.test()
    ProductDataService.getAll()
      .then(response => {
        this.inventory = response.data
      })
  }
}
</script>
