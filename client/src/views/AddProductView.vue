<template>
  <div class="product-add">
    <!-- Section-->
    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div
          class="
            row
            gx-4 gx-lg-5
            row-cols-2 row-cols-md-3 row-cols-xl-2
            justify-content-center
          "
        >
          <div class="col-sm-12">
            <h4 class="mb-3 text-white">Add new product</h4>
            <div class="needs-validation" novalidate>
              <div class="row g-2">
                <div v-if="!submitted">
                <div class="col-12">
                  <label for="productName" class="form-label text-white"
                    >Product Name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="productName"
                    v-model="product.nom"
                    placeholder=""
                    required
                  />
                  <div class="invalid-feedback">Valid name is required.</div>
                </div>
                <div class="col-12">
                  <label for="productPhoto" class="form-label text-white"
                    >Product Photo</label
                  >
                  <select
                    class="form-control"
                    id="productPhoto"
                    placeholder=""
                    v-model="product.photo"
                    required
                  >
                    <option value="">Select</option>
                    <option value="3310.png">Phone</option>
                    <option value="bravia.jpg">Tv</option>
                    <option value="PS5.png">PS5</option>
                    <option value="psp.jpg">PSP</option>
                  </select>
                  <div class="invalid-feedback">
                    Valid photo path is required.
                  </div>
                </div>
                <div class="col-12">
                  <label for="productPrice" class="form-label text-white">Price</label>
                  <div class="input-group has-validation">
                    <span class="input-group-text">CAD</span>
                    <input
                      type="text"
                      class="form-control"
                      id="productPrice"
                      v-model.number="product.prix"
                      placeholder=""
                      required
                    />
                    <div class="invalid-feedback">Price is required.</div>
                  </div>
                </div>
                <div class="col-12">
                  <label for="productDescription" class="form-label text-white"
                    >Product Description</label
                  >
                  <textarea
                    class="form-control"
                    id="productDescription"
                    placeholder=""
                    v-model="product.description"
                  ></textarea>
                  <div class="invalid-feedback text-white">Valid description</div>
                </div>
                <div class="col-12">
                  <label for="productType" class="form-label text-white"
                    >Product Type</label
                  >
                  <select
                    class="form-control"
                    id="productType"
                    placeholder=""
                    v-model="product.categorie"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Phone">Phone</option>
                    <option value="Tv">Tv</option>
                    <option value="PS5">PS5</option>
                    <option value="PSP">PSP</option>
                  </select>
                  <div class="invalid-feedback">
                    Valid photo path is required.
                  </div>
                </div>
                <button class="w-100 btn btn-secondary btn-lg mt-3" type="button" @click="saveProduct">Save </button>
                </div>
                <div v-else>
                  <div  class="alert alert-success alert-dismissible fade show" role="alert">
                  <strong> You submitted successfully!</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <button class="w-100 btn btn-success btn-lg mt-3" type="button" @click="newProduct">New product </button>
                </div>
                <hr class="my-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'

export default {
  props: ['addInv', 'inventory'],
  data () {
    return {
      submitted: false,
      product: {
        nom: null,
        photo: null,
        prix: null,
        description: null,
        categorie: null
      }
    }
  },
  methods: {
    saveProduct () {
      ProductDataService.create(this.product)
        .then(response => {
          this.product.id = response.data.id
          this.addInv(this.product)
        })
      this.submitted = true
    },
    newProduct () {
      this.product = {}
      this.submitted = false
    }
  },
  mounted () {
    console.log(this.inventory)
  }
}
</script>
