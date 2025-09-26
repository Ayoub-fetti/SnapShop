<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold text-blue-600">{{ product.price }}€</span>
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Ajouter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
