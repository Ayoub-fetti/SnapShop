<template>
  <div class="checkout">
    <h1>Commande</h1>

    <form @submit.prevent="submitOrder" class="checkout-form">
      <div class="form-group">
        <label>Nom :</label>
        <input v-model="form.name" type="text" required>
      </div>

      <div class="form-group">
        <label>Téléphone :</label>
        <input v-model="form.phone" type="tel" required>
      </div>

      <div class="form-group">
        <label>Adresse :</label>
        <textarea v-model="form.address" required></textarea>
      </div>

      <div class="order-summary">
        <h3>Résumé ({{ totalItems }} articles) - {{ totalPrice.toFixed(2) }}€</h3>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Traitement...' : 'Valider la commande' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart.js'
import { orderService } from '../firebase/orderService.js'

const router = useRouter()
const { cartItems, totalItems, totalPrice, clearCart } = useCart()

const form = ref({
  name: '',
  phone: '',
  address: ''
})

const loading = ref(false)

const submitOrder = async () => {
  loading.value = true

  try {
    await orderService.createOrder({
      nom: form.value.name,
      telephone: form.value.phone,
      adresse: form.value.address,
      commande: cartItems.value,
      total: totalPrice.value
    })

    clearCart()
    alert('Commande validée !')
    router.push('/')
  } catch (error) {
    alert('Erreur lors de la commande')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.checkout { max-width: 500px; margin: 0 auto; padding: 20px; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; }
.form-group input, .form-group textarea { width: 100%; padding: 8px; }
.order-summary { margin: 20px 0; padding: 15px; background: #f5f5f5; }
button { width: 100%; padding: 12px; background: #007bff; color: white; border: none; cursor: pointer; }
button:disabled { background: #ccc; }
</style>
