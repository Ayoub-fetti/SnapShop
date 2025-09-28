// src/firebase/orderService.js
import { db } from './firebaseConfig.js'
import { collection, addDoc, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore'

export const orderService = {
    async createOrder(orderData) {
        return await addDoc(collection(db, 'orders'), {
            ...orderData,
            createdAt: new Date(),
            status: 'pending'
        })
    },
    async getOrders() {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async updateOrderStatus(orderId, status) {
        const orderRef = doc(db, 'orders', orderId)
        return await updateDoc(orderRef, { status })
    }
}
