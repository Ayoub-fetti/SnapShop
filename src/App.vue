<script setup>
import { provide, onMounted, ref } from "vue";
import { auth, db } from './firebase/firebaseConfig.js';
import { useCart } from "./composables/useCart.js";
import CartSidebar from './components/CartSidebar.vue';

const cart = useCart()
const isCartOpen = ref(false)

onMounted(() => {
  cart.initializeCart()
})

provide('cart', cart)

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const closeCart = () => {
  isCartOpen.value = false
}
</script>

<template>
  <div>
    <nav class="p-4 border-b">
      <router-link to="/" class="mr-4">Home</router-link>
      <button @click="toggleCart" class="bg-blue-500 text-white px-3 py-1 rounded">
        Panier ({{ cart.totalItems }})
      </button>
    </nav>

    <router-view />

    <CartSidebar :isOpen="isCartOpen" @close="closeCart" />
  </div>
</template>
