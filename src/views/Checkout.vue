<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Finaliser la commande
        </h1>
        <p class="text-gray-600">Complétez vos informations de livraison</p>
      </div>

      <div class="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <form @submit.prevent="submitOrder" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                  placeholder="Votre nom complet"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <input
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                  placeholder="+212 6XX XXX XXX"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Adresse de livraison</label>
            <div class="relative">
              <div class="absolute top-3 left-0 pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <textarea
                  v-model="form.address"
                  required
                  rows="4"
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none resize-none"
                  placeholder="Numéro, rue, ville, code postal..."
              ></textarea>
            </div>
          </div>

          <div class="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Résumé de la commande</h3>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Articles ({{ totalItems }})</span>
              <span class="font-semibold text-gray-900">{{ totalPrice.toFixed(2) }} MAD</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Livraison</span>
              <span class="font-semibold text-green-600">Gratuite</span>
            </div>
            <div class="border-t border-blue-200 mt-4 pt-4">
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-gray-900">Total</span>
                <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {{ totalPrice.toFixed(2) }} MAD
                </span>
              </div>
            </div>
          </div>

          <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Traitement en cours...' : 'Valider la commande' }}
          </button>
        </form>
      </div>
    </div>
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
    
    await Swal.fire({
      title: 'تم تأكيد الطلب! / Commande validée!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 18px; margin-bottom: 15px; color: #27ae60;">✅ تم تأكيد طلبكم بنجاح!</p>
          <p style="font-size: 18px; margin-bottom: 15px; color: #27ae60;">✅ Votre commande a été validée avec succès!</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; margin: 15px 0;">
            <p style="font-size: 14px; color: #6c757d;">سنتواصل معكم قريباً لتأكيد التفاصيل</p>
            <p style="font-size: 14px; color: #6c757d;">Nous vous contacterons bientôt pour confirmer les détails</p>
          </div>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'عودة للصفحة الرئيسية / Retour à l\'accueil',
      confirmButtonColor: '#27ae60'
    })
    
    router.push('/')
  } catch (error) {
    await Swal.fire({
      title: 'خطأ في الطلب! / Erreur de commande!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; margin-bottom: 10px;">حدث خطأ أثناء معالجة طلبكم</p>
          <p style="font-size: 16px;">Une erreur s'est produite lors du traitement de votre commande</p>
          <p style="font-size: 14px; color: #6c757d; margin-top: 10px;">يرجى المحاولة مرة أخرى / Veuillez réessayer</p>
        </div>
      `,
      icon: 'error',
      confirmButtonText: 'موافق / OK',
      confirmButtonColor: '#e74c3c'
    })
  } finally {
    loading.value = false
  }
}
</script>

