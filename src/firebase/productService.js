// src/firebase/productService.js
import { db } from './firebaseConfig.js'
import { collection, getDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const COLLECTION_NAME = 'products'

export const productService = {
    async getProducts() {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async updateProduct(id, productData) {
        const productRef = doc(db, COLLECTION_NAME, id)
        return await updateDoc(productRef, productData)
    },

    async deleteProduct(id) {
        return await deleteDoc(doc(db, COLLECTION_NAME, id))
    },

    async getProduct(id) {
        const docRef = doc(db, COLLECTION_NAME, id)
        const docSnap = await getDoc(docRef)
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
    }
}
