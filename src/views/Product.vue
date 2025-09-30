<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
    <div class="container mx-auto px-4 py-12">
      <!-- Enhanced loading state with skeleton -->
      <div v-if="loading" class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 animate-pulse">
          <div class="aspect-square bg-gray-200 rounded-3xl"></div>
          <div class="space-y-6">
            <div class="h-12 bg-gray-200 rounded w-3/4"></div>
            <div class="h-6 bg-gray-200 rounded w-full"></div>
            <div class="h-6 bg-gray-200 rounded w-5/6"></div>
            <div class="h-16 bg-gray-200 rounded w-1/3"></div>
            <div class="h-14 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Enhanced product detail layout -->
      <div v-else-if="product" class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <!-- Enhanced image section with zoom effect -->
          <div class="sticky top-8">
            <div class="relative group overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
              <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
              >
              <div class="absolute top-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Nouveau
              </div>
            </div>
          </div>

          <!-- Enhanced product info section -->
          <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {{ product.name }}
            </h1>

            <p class="text-gray-600 text-lg mb-8 leading-relaxed">
              {{ product.description }}
            </p>

            <!-- Enhanced price display -->
            <div class="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <div class="flex items-baseline gap-2">
                <span class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {{ product.price }}
                </span>
                <span class="text-2xl text-gray-600 font-semibold">MAD</span>
              </div>
              <p class="text-sm text-gray-500 mt-2">Prix TTC, livraison incluse</p>
            </div>

            <!-- Enhanced add to cart button -->
            <button
                @click="addToCart(product)"
                class="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
            >
              <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Ajouter au panier
            </button>

            <!-- Added features section -->
            <div class="mt-8 grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-sm font-medium text-gray-700">Livraison rapide</span>
              </div>
              <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm font-medium text-gray-700">Garantie qualité</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced not found state -->
      <div v-else class="text-center py-20">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
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
