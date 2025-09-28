<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
      </div>
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div>
          <input
              v-model="email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Email"
          />
        </div>
        <div>
          <input
              v-model="password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Mot de passe"
          />
        </div>
        <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../firebase/authService.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await authService.login(email.value, password.value)
    router.push('/admin')
  } catch (err) {
    error.value = 'Email ou mot de passe incorrect'
  } finally {
    loading.value = false
  }
}
</script>
