<template>
    <!-- Section-->
    <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div v-for="(product, i) in inventory" :key="i" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
          <div class="card h-100">
            <!-- Product image -->
            <img style="max-height: 150px;" class="card-img-top" :src="require(`@/assets/img/pro/${product.photo}`)" alt="Product Image" />
            <div class="card-body">
              <h5 class="card-title">{{ product.nom }}</h5>
              <p class="card-text text-center">${{ product.prix.toFixed(2) }}</p>
              <p class="card-text text-center">{{ product.description }}</p>
            </div>
            <!-- Product actions -->
            <div class="card-footer bg-primary text-center">
              <!-- <input type="number" class="form-control qt mb-3" v-model.number="product.quantity" />
              <a class="btn btn-light" @click="add(product.nom, i)"><i class="fab fa-github"></i>Add to Cart</a> -->
              <router-link :to="{ name: 'edit-product', params: { id: product.id } }" class="btn btn-outline-success mt-10">Edit Product</router-link>
            </div>
            <div class="text-center mt-3">
              <router-link :to="{ name: 'product', params: { id: product.nom } }" class="btn btn-link">See More..</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
:root {
  --gradient: linear-gradient(to left top, #DD2476 10%, #FF512F 90%) !important;
}

body {
  background: #111 !important;
}

.card {
  background: #222;
  border: 1px solid #dd2476;
  color: rgba(250, 250, 250, 0.8);
  margin-bottom: 2rem;
}
.btn {
  border: 5px solid;
  border-image-slice: 1;
  background: var(--gradient) !important;

  text-decoration: none;
  transition: all .4s ease;
}
.btn:hover, .btn:focus {
  background: var(--gradient) !important;
  color: #fff !important;
  box-shadow: #222 1px 0 10px;
  text-decoration: underline;
}
</style>
<script>
import mitt from 'mitt'
export default {
  props: ['inventory', 'add'],
  data () {
    return {
      localInventory: [],
      emitter: mitt()
    }
  },
  mounted () {
    this.localInventory = [...this.inventory] // Créer une copie locale de l'inventaire
    this.emitter.on('product-updated', this.handleProductUpdated) // Écouter l'événement "product-updated"
  },
  beforeUnmount () {
    this.emitter.off('product-updated', this.handleProductUpdated) // Arrêter d'écouter l'événement "product-updated"
  },
  methods: {
    handleProductUpdated (updatedProduct) {
      if (updatedProduct) {
        const index = this.localInventory.findIndex(
          (product) => product._id === updatedProduct._id
        )
        if (index !== -1) {
          this.$set(this.localInventory, index, updatedProduct)
        }
      } else {
        const index = this.localInventory.findIndex(
          (product) => product._id === this.deletedProductId
        )
        if (index !== -1) {
          this.localInventory.splice(index, 1)
        }
      }
    }
  }
}
</script>
