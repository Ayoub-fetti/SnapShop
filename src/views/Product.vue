<template>
  <!-- Redesigned product page with Petit Pan's light, airy aesthetic -->
  <div class="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50">
    <div class="container mx-auto px-4 py-12">
      <!-- Loading state -->
      <div v-if="loading" class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 animate-pulse">
          <div class="aspect-square bg-gradient-to-br from-blue-100 to-pink-100 rounded-3xl"></div>
          <div class="space-y-6">
            <div class="h-12 bg-gray-200 rounded-2xl w-3/4"></div>
            <div class="h-6 bg-gray-200 rounded-xl w-full"></div>
            <div class="h-6 bg-gray-200 rounded-xl w-5/6"></div>
            <div class="h-16 bg-gray-200 rounded-2xl w-1/3"></div>
            <div class="h-14 bg-gray-200 rounded-2xl w-full"></div>
          </div>
        </div>
      </div>

      <!-- Product detail -->
      <div v-else-if="product" class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <!-- Image section -->
          <div class="sticky top-24">
            <div class="relative group overflow-hidden rounded-3xl shadow-lg bg-white p-6">
              <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
              >
              <div class="absolute top-10 right-10 bg-gradient-to-br from-pink-400 to-orange-400 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg rotate-12">
                Nouveau
              </div>
            </div>
          </div>

          <!-- Product info -->
          <div class="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
              {{ product.name }}
            </h1>

            <p class="text-gray-600 text-lg mb-8 leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Price display -->
            <div class="mb-8 p-6 bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl border-2 border-blue-100">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl font-bold text-blue-600">
                  {{ product.price }}
                </span>
                <span class="text-2xl text-gray-600 font-semibold">MAD</span>
              </div>
              <p class="text-sm text-gray-500 mt-2">Prix TTC, livraison incluse</p>
            </div>

            <!-- Add to cart button -->
            <button
                @click="addToCart(product)"
                class="group w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Ajouter au panier
            </button>

            <!-- Features -->
            <div class="mt-8 grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-sm font-semibold text-gray-700">Livraison rapide</span>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl">
                <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm font-semibold text-gray-700">Garantie qualité</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Not found state -->
      <div v-else class="text-center py-20">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-orange-100 mb-6">
          <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-700 mb-2">Produit non trouvé</h3>
        <p class="text-gray-500">Ce produit n'existe pas ou a été supprimé</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '../firebase/productService.js'

const route = useRoute()
const cart = inject('cart')
const product = ref(null)
const loading = ref(true)

const addToCart = cart.addToCart

onMounted(async () => {
  try {
    product.value = await productService.getProduct(route.params.id)
  } catch (error) {
    console.error('Erreur lors du chargement du produit:', error)
  } finally {
    loading.value = false
  }
})
</script>
