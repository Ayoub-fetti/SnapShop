<template>
  <div class="fixed inset-0 z-50" v-if="isOpen">
    <!-- Updated backdrop and sidebar with Petit Pan's colorful style -->
    <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        @click="$emit('close')"
    ></div>

    <div class="absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl flex flex-col">
      <!-- Header with gradient -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">Mon Panier</h2>
        </div>
        <button
            @click="$emit('close')"
            class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 flex items-center justify-center"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="cartItems.length === 0" class="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-pink-50">
        <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center mb-6">
          <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">Votre panier est vide</h3>
        <p class="text-gray-500 text-center">Ajoutez des produits colorés pour commencer !</p>
      </div>

      <!-- Cart items -->
      <div v-else class="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-blue-50">
        <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white rounded-2xl p-4 border-2 border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300"
        >
          <div class="flex gap-4">
            <div class="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border-2 border-gray-100">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-900 mb-1 truncate">{{ item.name }}</h3>
              <p class="text-lg font-bold text-blue-600 mb-3">{{ item.price }} MAD</p>

              <!-- Quantity controls -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 bg-gray-50 rounded-full p-1 border-2 border-gray-200">
                  <button
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="w-8 h-8 rounded-full bg-white hover:bg-blue-50 text-gray-700 font-bold transition-all duration-200 flex items-center justify-center shadow-sm"
                  >
                    −
                  </button>
                  <span class="w-8 text-center font-bold text-gray-900">{{ item.quantity }}</span>
                  <button
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all duration-200 flex items-center justify-center shadow-sm"
                  >
                    +
                  </button>
                </div>

                <button
                    @click="handleRemoveItem(item.id, item.name)"
                    class="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cartItems.length > 0" class="border-t-2 border-blue-100 p-6 space-y-4 bg-white">
        <div class="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl">
          <span class="text-lg font-bold text-gray-700">Total</span>
          <span class="text-3xl font-bold text-blue-600">
            {{ totalPrice }} MAD
          </span>
        </div>

        <button
            @click="goToCheckout"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Valider la commande
        </button>

        <button
            @click="handleClearCart"
            class="w-full bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Vider le panier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart.js'
import Swal from 'sweetalert2'

const router = useRouter()
const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

defineProps(['isOpen'])
const emit = defineEmits(['close'])

const goToCheckout = () => {
  emit('close')
  router.push('/checkout')
}

const handleRemoveItem = async (itemId, itemName) => {
  const result = await Swal.fire({
    title: 'إزالة المنتج / Supprimer le produit',
    html: `
      <div style="text-align: center;">
        <p style="font-size: 16px; margin-bottom: 10px;">هل تريد إزالة هذا المنتج من السلة؟</p>
        <p style="font-size: 16px;">Voulez-vous supprimer ce produit du panier ?</p>
        <p style="font-weight: bold; color: #2563eb; margin-top: 10px;">${itemName}</p>
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'نعم، إزالة / Oui, supprimer',
    cancelButtonText: 'إلغاء / Annuler',
    reverseButtons: true
  })

  if (result.isConfirmed) {
    removeFromCart(itemId)
    
    Swal.fire({
      title: 'تمت الإزالة! / Supprimé!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; margin-bottom: 10px;">تم حذف المنتج من السلة</p>
          <p style="font-size: 16px;">Produit supprimé du panier</p>
        </div>
      `,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    })
  }
}

const handleClearCart = async () => {
  const result = await Swal.fire({
    title: 'إفراغ السلة / Vider le panier',
    html: `
      <div style="text-align: center;">
        <p style="font-size: 16px; margin-bottom: 10px;">هل تريد إفراغ السلة بالكامل؟</p>
        <p style="font-size: 16px;">Voulez-vous vider complètement le panier ?</p>
        <p style="font-size: 14px; color: #e74c3c; margin-top: 10px;">⚠️ لا يمكن التراجع عن هذا الإجراء / Cette action ne peut pas être annulée</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'نعم، إفراغ السلة / Oui, vider',
    cancelButtonText: 'إلغاء / Annuler',
    reverseButtons: true
  })

  if (result.isConfirmed) {
    clearCart()
    
    Swal.fire({
      title: 'تم إفراغ السلة! / Panier vidé!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; margin-bottom: 10px;">تم إفراغ السلة بالكامل</p>
          <p style="font-size: 16px;">Le panier a été complètement vidé</p>
        </div>
      `,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })
  }
}
</script>
