// src/composables/useLoading.js
import { ref } from 'vue'

const isLoading = ref(true)
let loadingTimeout = null

export function useLoading() {
    const startLoading = () => {
        isLoading.value = true
        if (loadingTimeout) {
            clearTimeout(loadingTimeout)
        }
    }

    const stopLoading = () => {
        loadingTimeout = setTimeout(() => {
            isLoading.value = false
        }, 2000)
    }

    return {
        isLoading,
        startLoading,
        stopLoading
    }
}
