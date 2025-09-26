<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Liste des produits</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'

const products = [
  {
    id: 1,
    name: "Produit 1",
    description: "Description du produit",
    price: 29.99,
    image: "https://via.placeholder.com/300x200"
  }
]
</script>
