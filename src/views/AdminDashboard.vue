<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <button
              @click="handleLogout"
              class="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Onglets -->
      <div class="mb-6">
        <nav class="flex space-x-8">
          <button
              @click="activeTab = 'products'"
              :class="activeTab === 'products' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'"
              class="py-2 px-1 border-b-2 font-medium text-sm"
          >
            Produits
          </button>
          <button
              @click="activeTab = 'orders'"
              :class="activeTab === 'orders' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'"
              class="py-2 px-1 border-b-2 font-medium text-sm"
          >
            Commandes
          </button>
        </nav>
      </div>

      <!-- Section Produits -->
      <div v-if="activeTab === 'products'" class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium text-gray-900">Produits</h3>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-for="product in products" :key="product.id" class="px-4 py-4 flex items-center justify-between">
            <div class="flex items-center">
              <img v-if="product.imageUrl" :src="product.imageUrl" alt="" class="h-16 w-16 object-cover rounded mr-4" />
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ product.title }}</h4>
                <p class="text-sm text-gray-500">{{ product.price }}MAD</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                  @click="editProduct(product)"
                  class="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
              >
                Modifier
              </button>
              <button
                  @click="deleteProduct(product)"
                  class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Section Commandes -->
      <div v-if="activeTab === 'orders'" class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium text-gray-900">Commandes</h3>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-for="order in orders" :key="order.id" class="px-4 py-4">
            <div class="flex justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ order.nom }}</h4>
                <p class="text-sm text-gray-500">{{ order.telephone }}</p>
                <p class="text-sm text-gray-500">{{ order.adresse }}</p>
                <p class="text-sm font-medium text-green-600">{{ order.total?.toFixed(2) }}€</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500">{{ formatDate(order.createdAt) }}</p>
                <span
                    :class="order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
            {{ order.status }}
          </span>
                <button
                    v-if="order.status === 'pending'"
                    @click="confirmOrder(order.id)"
                    class="px-3 py-1 ml-2 bg-green-600 text-white rounded-full cursor-pointer text-xs hover:bg-green-700"
                >
                  Confirmer
                </button>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-xs text-gray-600">Articles: {{ order.commande?.length || 0 }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal de modification (existant) -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium mb-4">Modifier le produit</h3>
        <form @submit.prevent="updateProduct">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Nom</label>
            <input v-model="editForm.title" type="text" class="w-full border rounded px-3 py-2" required>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Description</label>
            <textarea v-model="editForm.description" class="w-full border rounded px-3 py-2" rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Prix (MAD)</label>
            <input v-model="editForm.price" type="number" class="w-full border rounded px-3 py-2" required>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeEditModal" class="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const newProduct = ref({
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

const addProduct = async () => {
  loading.value = true
  try {
    await productService.addProduct(newProduct.value, selectedImage.value)
    newProduct.value = { title: '', description: '', price: '' }
    selectedImage.value = null
    loadProducts()
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}

const deleteProduct = async (product) => {
  if (confirm('Supprimer ce produit ?')) {
    await productService.deleteProduct(product.id, product.imageUrl)
    loadProducts()
  }
}

const editProduct = (product) => {
  editForm.value = {
    id: product.id,
    title: product.title || product.name,
    description: product.description,
    price: product.price
  }
  showEditModal.value = true
}

const updateProduct = async () => {
  try {
    await productService.updateProduct(editForm.value.id, {
      title: editForm.value.title,
      description: editForm.value.description,
      price: Number(editForm.value.price)
    })
    closeEditModal()
    loadProducts()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = { id: '', title: '', description: '', price: '' }
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
    loadOrders() // Recharger les commandes
  } catch (error) {
    console.error('Erreur:', error)
  }
}

onMounted(() => {
  loadProducts()
  loadOrders()
})
</script>
