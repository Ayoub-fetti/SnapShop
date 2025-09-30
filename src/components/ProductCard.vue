<template>
  <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100">
    <div class="relative overflow-hidden aspect-square">
      <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <button
          @click="viewProduct(product.id)"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:cursor-pointer hover:bg-gray-50"
      >
        Voir détails
      </button>
    </div>
    <div class="p-6">
      <h3 class="font-bold text-xl mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
        {{ product.name }}
      </h3>
      <div class="flex items-center justify-between mt-4">
        <div class="flex flex-col">
          <span class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {{ product.price }}
          </span>
          <span class="text-sm text-gray-500 font-medium">MAD</span>
        </div>
        <button
            @click="addToCart(product)"
            class="group/btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        >
          <svg class="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span class="hidden sm:inline">Ajouter</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter()

const cart = inject('cart')
const addToCart = cart.addToCart

const viewProduct = (productId) => {
  router.push(`/product/${productId}`)
}

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
