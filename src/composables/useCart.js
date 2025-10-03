/* global Swal */

import { ref, computed, watch } from 'vue'

const CART_STORAGE_KEY = 'shopping-cart'

// État global du panier
const cartItems = ref([])

// Variable pour savoir si le panier est initialisé
let isInitialized = false

// Initialiser le panier depuis localStorage
const initializeCart = () => {
    if (!isInitialized) {
        const stored = localStorage.getItem(CART_STORAGE_KEY)
        if (stored) {
            try {
                cartItems.value = JSON.parse(stored)
            } catch (error) {
                console.error('Erreur lors du chargement du panier:', error)
                cartItems.value = []
            }
        }
        isInitialized = true
    }
}

// Sauvegarder dans localStorage
const saveToStorage = () => {
    if (isInitialized) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
    }
}

export function useCart() {
    // Ajouter un produit au panier
    const addToCart = (product) => {
        const existingItem = cartItems.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cartItems.value.push({
                ...product,
                quantity: 1
            })
        }
        
        Swal.fire({
            title: 'نجح! / Succès!',
            html: `
                <div style="text-align: center;">
                    <p style="font-size: 16px; margin-bottom: 10px;">تمت إضافة المنتج إلى السلة بنجاح!</p>
                    <p style="font-size: 16px;">Produit ajouté au panier avec succès!</p>
                </div>
            `,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        })

        // Sauvegarder immédiatement
        saveToStorage()
    }

    // Supprimer un produit du panier
    const removeFromCart = (productId) => {
        const index = cartItems.value.findIndex(item => item.id === productId)
        if (index > -1) {
            cartItems.value.splice(index, 1)
            saveToStorage()
        }
    }

    // Mettre à jour la quantité
    const updateQuantity = (productId, quantity) => {
        const item = cartItems.value.find(item => item.id === productId)
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId)
            } else {
                item.quantity = quantity
                saveToStorage()
            }
        }
    }

    // Vider le panier
    const clearCart = () => {
        cartItems.value = []
        saveToStorage()
    }

    // Calculer le total
    const totalItems = computed(() =>
        cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    const totalPrice = computed(() =>
        cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    )

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        initializeCart
    }
}