<!-- src/components/CartSidebar.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-transparent backdrop-blur-xs" @click="$emit('close')"></div>
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Mon Panier</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <div v-if="cartItems.length === 0" class="text-center text-gray-500">
        Votre panier est vide
      </div>

      <div v-else class="space-y-4">
        <div v-for="item in cartItems" :key="item.id" class="border-b pb-4">
          <h3 class="font-semibold">{{ item.name }}</h3>
          <p class="text-gray-600">{{ item.price }} MAD</p>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
              <button @click="updateQuantity(item.id, item.quantity - 1)" class="bg-gray-200 px-2 py-1 rounded text-sm">-</button>
              <span class="px-2">{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)" class="bg-gray-200 px-2 py-1 rounded text-sm">+</button>
            </div>
            <button @click="removeFromCart(item.id)" class="text-red-500 text-sm">Supprimer</button>
          </div>
        </div>

        <div class="border-t pt-4">
          <p class="text-lg font-bold mb-4">Total: {{ totalPrice }} MAD</p>
          <button @click="clearCart" class="w-full bg-red-500 text-white py-2 rounded mb-2">Vider le panier</button>
          <router-link to="/checkout" class="mr-4"><button class="w-full bg-red-500 text-white py-2 rounded mb-2">Valider la commande</button></router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart.js'

defineProps(['isOpen'])
defineEmits(['close'])

const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
</script>
