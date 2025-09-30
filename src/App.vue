<script setup>
import { provide, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth, db } from './firebase/firebaseConfig.js';
import { useCart } from "./composables/useCart.js";
import { useLoading } from "./composables/useLoading.js";
import { setGlobalLoading } from "./router/index.js";
import CartSidebar from './components/CartSidebar.vue';
import TruckLoader from './components/TruckLoader.vue';

const { totalItems, initializeCart, ...cart } = useCart()
const loading = useLoading()
const { isLoading } = loading
const isCartOpen = ref(false)
const route = useRoute()
const router = useRouter()

const showNavbar = computed(() => {
  const hiddenRoutes = ['/admin/login', '/admin']
  return !hiddenRoutes.includes(route.path)
})

const canGoBack = computed(() => {
  return window.history.length > 1
})

onMounted(() => {
  initializeCart()
  setGlobalLoading(loading)
})

provide('cart', { totalItems, ...cart })
provide('loading', loading)

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const closeCart = () => {
  isCartOpen.value = false
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="app">
    <TruckLoader :show="isLoading" />

    <nav v-if="showNavbar" class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <button v-if="canGoBack" @click="goBack" class="back-btn">
            <i class="fa-solid fa-circle-left text-2xl"></i>
          </button>
          <router-link to="/" class="logo">SnapShop</router-link>
        </div>
        <button @click="toggleCart" class="cart-btn">
          <i class="fa-solid fa-cart-plus"></i>
          Panier
          <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
        </button>
      </div>
    </nav>

    <main>
      <router-view />
    </main>

    <CartSidebar v-if="showNavbar" :isOpen="isCartOpen" @close="closeCart" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f9fafb;
}

.navbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 40;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  background: white;
  color: #2563eb;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  transition: background-color 0.2s;
}

.back-btn:hover {
  cursor: pointer;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  text-decoration: none;
  transition: color 0.2s;
}

.logo:hover {
  color: #2563eb;
}

.cart-btn {
  position: relative;
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.cart-btn:hover {
  background: #1d4ed8;
}

.cart-badge {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.router-link-active {
  color: #2563eb;
}
</style>
