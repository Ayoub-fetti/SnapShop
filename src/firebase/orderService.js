// src/firebase/orderService.js
import { db } from './firebaseConfig.js'
import { collection, addDoc } from 'firebase/firestore'

export const orderService = {
    async createOrder(orderData) {
        return await addDoc(collection(db, 'orders'), {
            ...orderData,
            createdAt: new Date(),
            status: 'pending'
        })
    }
}
