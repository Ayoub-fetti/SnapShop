<template>
  <div class="group bg-white rounded-3xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-blue-200">
    <div class="relative overflow-hidden aspect-square bg-gray-50">
      <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
      <!-- Added colorful "NEW" badge like Petit Pan -->
      <div class="absolute top-4 right-4 bg-gradient-to-br from-pink-400 to-orange-400 text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg rotate-12 transform group-hover:rotate-0 transition-transform duration-300">
        Nouveau
      </div>
      <button
          @click="viewProduct(product.id)"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-blue-600 px-6 py-2.5 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-blue-50 text-sm"
      >
        Voir le produit
      </button>
    </div>
    <div class="p-5">
      <h3 class="font-bold text-lg mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
        {{ product.name }}
      </h3>
      <div class="flex items-center justify-between mt-4">
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-bold text-blue-600">
            {{ product.price }}
          </span>
          <span class="text-sm text-gray-500 font-medium">MAD</span>
        </div>
        <button
            @click="addToCart(product)"
            class="group/btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm"
        >
          <svg class="w-4 h-4 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span>Ajouter</span>
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
