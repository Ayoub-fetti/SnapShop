<template>
  <!-- Redesigned admin login with Petit Pan's colorful gradient style -->
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-pink-500 p-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-white/50">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 mb-4">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Connexion Admin
          </h2>
          <p class="text-gray-600">Accédez à votre tableau de bord</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input
                  v-model="email"
                  type="email"
                  required
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                  placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                  v-model="password"
                  type="password"
                  required
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                  placeholder="••••••••"
              />
            </div>
          </div>

          <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-400 rounded-2xl">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-red-700 text-sm font-medium">{{ error }}</span>
            </div>
          </div>

          <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </form>
      </div>
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
