import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set, update } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAq2vQZqY94dYJkF9K7X7M8N6P5L4O3I2U1Y0T9R8E7W6Q5Z4A3S2D1F0G",
  authDomain: "home-cooking-app-12345.firebaseapp.com",
  databaseURL: "https://home-cooking-app-12345-default-rtdb.firebaseio.com",
  projectId: "home-cooking-app-12345",
  storageBucket: "home-cooking-app-12345.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export const cartRef = ref(db, 'cart')
export const historyRef = ref(db, 'history')
export const totalOrdersRef = ref(db, 'totalOrders')

export function listenToCart(callback: (cart: string[]) => void) {
  onValue(cartRef, (snapshot) => {
    const data = snapshot.val()
    callback(data || [])
  })
}

export function listenToHistory(callback: (history: string[]) => void) {
  onValue(historyRef, (snapshot) => {
    const data = snapshot.val()
    callback(data || [])
  })
}

export function listenToTotalOrders(callback: (count: number) => void) {
  onValue(totalOrdersRef, (snapshot) => {
    const data = snapshot.val()
    callback(data || 0)
  })
}

export function updateCart(cart: string[]) {
  set(cartRef, cart)
}

export function updateHistory(history: string[]) {
  set(historyRef, history)
}

export function incrementTotalOrders() {
  update(totalOrdersRef, { '.sv': 'increment' })
}
