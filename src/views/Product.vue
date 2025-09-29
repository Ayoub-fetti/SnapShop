<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else-if="product" class="max-w-4xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8">
        <img :src="product.image" :alt="product.name" class="w-full rounded-lg">
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          <p class="text-gray-600 mb-6">{{ product.description }}</p>
          <div class="text-2xl font-bold text-blue-600 mb-6">{{ product.price }} MAD</div>
          <button
              class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              @click="addToCart(product)"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center">Produit non trouvé</div>
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
