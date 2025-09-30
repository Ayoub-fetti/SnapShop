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
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
    <div class="container mx-auto px-4 py-12">
      <div class="mb-12 text-center">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Découvrez nos produits
        </h1>
        <p class="text-gray-600 text-lg">Explorez notre collection exclusive</p>
      </div>

      <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            class="transform transition-all duration-300 hover:scale-105"
        />
      </div>

      <div v-else class="text-center py-20">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-700 mb-2">Aucun produit disponible</h3>
        <p class="text-gray-500">Revenez bientôt pour découvrir nos nouveautés</p>
      </div>
    </div>
  </div>
</template>
