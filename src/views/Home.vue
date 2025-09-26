<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig.js'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])
const loading = ref(true)

async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, 'products'))
  products.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  loading.value = false
}

onMounted(fetchProducts)
</script>


<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Liste des produits</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>


