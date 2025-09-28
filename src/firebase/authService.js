import { auth } from './firebaseConfig.js'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

export const authService = {
    // Inscription
    async register(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password)
    },

    // Connexion
    async login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
    },

    // Déconnexion
    async logout() {
        return await signOut(auth)
    },

    // Observer l'état d'authentification
    onAuthStateChanged(callback) {
        return onAuthStateChanged(auth, callback)
    },

    // Utilisateur actuel
    getCurrentUser() {
        return auth.currentUser
    }
}
