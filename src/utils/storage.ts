const CART_KEY = 'home_cooking_cart'
const HISTORY_KEY = 'home_cooking_history'
const TOTAL_ORDERS_KEY = 'home_cooking_total_orders'

export function saveCart(cart: string[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function loadCart(): string[] {
  const data = localStorage.getItem(CART_KEY)
  return data ? JSON.parse(data) : []
}

export function saveHistory(history: string[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function loadHistory(): string[] {
  const data = localStorage.getItem(HISTORY_KEY)
  return data ? JSON.parse(data) : []
}

export function saveTotalOrders(count: number): void {
  localStorage.setItem(TOTAL_ORDERS_KEY, String(count))
}

export function loadTotalOrders(): number {
  const data = localStorage.getItem(TOTAL_ORDERS_KEY)
  return data ? parseInt(data, 10) : 0
}
