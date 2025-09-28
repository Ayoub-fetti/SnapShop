import { db, storage } from './firebaseConfig.js'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const COLLECTION_NAME = 'products'

export const productService = {
    // Ajouter un produit
    async addProduct(productData, imageFile) {
        let imageUrl = null
        if (imageFile) {
            const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`)
            const snapshot = await uploadBytes(imageRef, imageFile)
            imageUrl = await getDownloadURL(snapshot.ref)
        }

        return await addDoc(collection(db, COLLECTION_NAME), {
            ...productData,
            imageUrl,
            createdAt: new Date()
        })
    },

    // Récupérer tous les produits
    async getProducts() {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    // Mettre à jour un produit
    async updateProduct(id, productData, imageFile) {
        const productRef = doc(db, COLLECTION_NAME, id)
        let updateData = { ...productData }

        if (imageFile) {
            const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`)
            const snapshot = await uploadBytes(imageRef, imageFile)
            updateData.imageUrl = await getDownloadURL(snapshot.ref)
        }

        return await updateDoc(productRef, updateData)
    },

    // Supprimer un produit
    async deleteProduct(id, imageUrl) {
        if (imageUrl) {
            const imageRef = ref(storage, imageUrl)
            await deleteObject(imageRef)
        }
        return await deleteDoc(doc(db, COLLECTION_NAME, id))
    }
}
