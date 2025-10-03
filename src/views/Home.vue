<script setup>
import { ref, onMounted, inject } from 'vue'
import { productService } from '../firebase/productService.js'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])
const { startLoading, stopLoading } = inject('loading')

async function fetchProducts() {
  startLoading()
  try {
    products.value = await productService.getProducts()
  } finally {
    stopLoading()
  }
}

onMounted(fetchProducts)
</script>

<template>
  <!-- Redesigned with Petit Pan's light, colorful aesthetic -->
  <div class="min-h-screen bg-gradient-to-b from-blue-50 via-pink-50 to-orange-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-16 px-4 mb-12">
      <div class="container mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Découvrez nos dernières nouveautés
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 font-light">
          Des produits colorés et joyeux pour égayer votre quotidien
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 pb-16">
      <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>

      <!-- Updated empty state with playful design -->
      <div v-else class="text-center py-20">
        <div class="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 mb-6">
          <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
        </div>
        <h3 class="text-3xl font-bold text-gray-700 mb-3">Aucun produit disponible</h3>
        <p class="text-lg text-gray-500">Revenez bientôt pour découvrir nos nouveautés colorées !</p>
      </div>
    </div>
  </div>
</template>
