import { ref, onMounted } from 'vue'
import { authService } from '../firebase/authService.js'

export function useAuth() {
    const user = ref(null)
    const loading = ref(true)

    onMounted(() => {
        authService.onAuthStateChanged((authUser) => {
            user.value = authUser
            loading.value = false
        })
    })

    return {
        user,
        loading,
        login: authService.login,
        register: authService.register,
        logout: authService.logout
    }
}
