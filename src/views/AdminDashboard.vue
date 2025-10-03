<template>
  <!-- Updated to Petit Pan color palette - bright blues, pinks, oranges instead of purple gradients -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50">
    <nav class="bg-white shadow-md border-b-4 border-blue-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center gap-4">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Dashboard Admin
            </h1>
          </div>
          <button
              @click="handleLogout"
              class="px-6 py-3 text-sm font-semibold text-gray-700 hover:text-red-500 transition-all duration-300 flex items-center gap-2 rounded-2xl hover:bg-red-50"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Déconnexion
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Updated tab buttons with Petit Pan colors -->
      <div class="mb-8">
        <nav class="flex gap-4 bg-white rounded-3xl p-2 shadow-lg border-2 border-blue-200">
          <button
              @click="activeTab = 'products'"
              :class="activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-400 to-pink-400 text-white shadow-lg scale-100'
              : 'text-gray-600 hover:bg-blue-50'"
              class="flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            Produits
          </button>
          <button
              @click="activeTab = 'orders'"
              :class="activeTab === 'orders'
              ? 'bg-gradient-to-r from-pink-400 to-orange-400 text-white shadow-lg scale-100'
              : 'text-gray-600 hover:bg-pink-50'"
              class="flex-1 py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Commandes
          </button>
        </nav>
      </div>

      <!-- Updated product cards with brighter, more playful colors -->
      <div v-if="activeTab === 'products'" class="space-y-4">
        <div v-for="product in products" :key="product.id"
             class="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-blue-100 hover:border-pink-200">
          <div class="p-6 flex items-center justify-between">
            <div class="flex items-center gap-6">
              <img
                  v-if="product.image"
                  :src="product.image"
                  alt=""
                  class="w-28 h-28 object-cover rounded-2xl shadow-md border-2 border-blue-100"
              />
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-2">{{ product.name }}</h4>
                <p class="text-sm text-gray-600 mb-3">{{ product.description }}</p>
                <span class="inline-block px-5 py-2 bg-gradient-to-r from-blue-100 to-pink-100 text-blue-700 rounded-full text-sm font-bold shadow-sm">
                  {{ product.price }} MAD
                </span>
              </div>
            </div>
            <div class="flex gap-3">
              <button
                  @click="editProduct(product)"
                  class="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-2xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Modifier
              </button>
              <button
                  @click="deleteProduct(product)"
                  class="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white rounded-2xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
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

      <!-- Updated order cards with Petit Pan color scheme -->
      <div v-if="activeTab === 'orders'" class="space-y-4">
        <div v-for="order in orders" :key="order.id"
             class="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-pink-100 hover:border-orange-200">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center border-2 border-blue-200">
                  <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900">{{ order.nom }}</h4>
                  <p class="text-sm text-gray-600">{{ order.telephone }}</p>
                </div>
              </div>
              <div class="flex items-start gap-2 mb-2">
                <svg class="w-5 h-5 text-pink-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                <p class="text-sm text-gray-700">{{ order.adresse }}</p>
              </div>
              <div class="flex items-center gap-4 mt-4">
                <span class="text-3xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  {{ order.total?.toFixed(2) }} MAD
                </span>
                <span class="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                  {{ order.commande?.length || 0 }} articles
                </span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500 mb-3">{{ formatDate(order.createdAt) }}</p>
              <span
                  :class="order.status === 'confirmed'
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-yellow-100 text-yellow-700 border-yellow-300'"
                  class="inline-flex items-center px-5 py-2 text-sm font-bold rounded-full border-2"
              >
                {{ order.status }}
              </span>
              <button
                  v-if="order.status === 'pending'"
                  @click="confirmOrder(order.id)"
                  class="mt-3 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-2xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2 ml-auto"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Updated modal with Petit Pan styling -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all border-4 border-blue-200">
        <h3 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Modifier le produit
        </h3>
        <form @submit.prevent="updateProduct" class="space-y-5">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Nom du produit</label>
            <input
                v-model="editForm.name"
                type="text"
                class="w-full border-2 border-blue-200 rounded-2xl px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all duration-200 outline-none"
                required
            >
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea
                v-model="editForm.description"
                class="w-full border-2 border-blue-200 rounded-2xl px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all duration-200 outline-none resize-none"
                rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Prix (MAD)</label>
            <input
                v-model="editForm.price"
                type="number"
                class="w-full border-2 border-blue-200 rounded-2xl px-4 py-3 focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all duration-200 outline-none"
                required
            >
          </div>
          <div class="flex gap-3 pt-4">
            <button
                type="button"
                @click="closeEditModal"
                class="flex-1 px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300"
            >
              Annuler
            </button>
            <button
                type="submit"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 via-pink-400 to-orange-400 hover:from-blue-500 hover:via-pink-500 hover:to-orange-500 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>


<script setup>
/* global Swal */
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../firebase/authService.js'
import { productService } from '../firebase/productService.js'
import { orderService } from '../firebase/orderService.js'

const router = useRouter()
const products = ref([])
const orders = ref([])
const activeTab = ref('products')
const loading = ref(false)
const selectedImage = ref(null)
const showEditModal = ref(false)
const editForm = ref({
  id: '',
  title: '',
  description: '',
  price: ''
})


const handleLogout = async () => {
  await authService.logout()
  router.push('/admin/login')
}

const formatDate = (date) => {
  if (!date) return ''
  const d = date.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString('fr-FR') + ' ' + d.toLocaleTimeString('fr-FR')
}

const handleImageChange = (event) => {
  selectedImage.value = event.target.files[0]
}


const deleteProduct = async (product) => {
  const result = await Swal.fire({
    title: 'تأكيد الحذف / Confirmer la suppression',
    html: `
      <div style="text-align: center;">
        <p style="font-size: 16px; margin-bottom: 10px;">هل أنت متأكد من حذف هذا المنتج؟</p>
        <p style="font-size: 16px;">Êtes-vous sûr de vouloir supprimer ce produit ?</p>
        <p style="font-weight: bold; color: #e74c3c; margin-top: 10px;">${product.name}</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'نعم، احذف / Oui, supprimer',
    cancelButtonText: 'إلغاء / Annuler',
    reverseButtons: true
  })
  if (result.isConfirmed) {
    try {
      await productService.deleteProduct(product.id, product.imageUrl)
      loadProducts()
      
      await Swal.fire({
        title: 'تم الحذف! / Supprimé!',
        html: `
          <div style="text-align: center;">
            <p style="font-size: 16px; margin-bottom: 10px;">تم حذف المنتج بنجاح!</p>
            <p style="font-size: 16px;">Le produit a été supprimé avec succès!</p>
          </div>
        `,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error deleting product:', error)
      
      await Swal.fire({
        title: 'خطأ! / Erreur!',
        html: `
          <div style="text-align: center;">
            <p style="font-size: 16px; margin-bottom: 10px;">فشل في حذف المنتج. يرجى المحاولة مرة أخرى.</p>
            <p style="font-size: 16px;">Échec de la suppression du produit. Veuillez réessayer.</p>
          </div>
        `,
        icon: 'error',
        confirmButtonText: 'موافق / OK'
      })
    }
  }
}

const editProduct = (product) => {
  editForm.value = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price
  }
  showEditModal.value = true
}

const updateProduct = async () => {
  try {
    await productService.updateProduct(editForm.value.id, {
      name: editForm.value.name,
      description: editForm.value.description,
      price: Number(editForm.value.price)
    })
    closeEditModal()
      await Swal.fire({
            title: 'تم التحديث! / Mis à jour!',
            html: `
              <div style="text-align: center;">
                <p style="font-size: 16px; margin-bottom: 10px;">تم تحديث المنتج بنجاح!</p>
                <p style="font-size: 16px;">Produit mis à jour avec succès!</p>
              </div>
            `,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
    loadProducts()
  } catch (error) {
    await Swal.fire({
      title: 'خطأ! / Erreur!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; margin-bottom: 10px;">حدث خطأ أثناء التحديث!</p>
          <p style="font-size: 16px;">Une erreur s'est produite lors de la mise à jour!</p>
        </div>
      `,
      icon: 'error',
      confirmButtonText: 'موافق / OK'
    })
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = { id: '', name: '', description: '', price: '' }
}

const loadProducts = async () => {
  products.value = await productService.getProducts()
}

const loadOrders = async () => {
  orders.value = await orderService.getOrders()
}
const confirmOrder = async (orderId) => {
  try {
    await orderService.updateOrderStatus(orderId, 'confirmed')
    loadOrders()
    
    await Swal.fire({
      title: 'تم التأكيد! / Confirmé!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; margin-bottom: 10px;">تم تأكيد الطلب بنجاح!</p>
          <p style="font-size: 16px;">Commande confirmée avec succès!</p>
        </div>
      `,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Erreur:', error)
    
    await Swal.fire({
      title: 'خطأ! / Erreur!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; margin-bottom: 10px;">فشل في تأكيد الطلب!</p>
          <p style="font-size: 16px;">Échec de la confirmation de la commande!</p>
        </div>
      `,
      icon: 'error',
      confirmButtonText: 'موافق / OK'
    })
  }
}

onMounted(() => {
  loadProducts()
  loadOrders()
})
</script>
