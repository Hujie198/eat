import { ref, computed, watch } from 'vue'
import { dishes, categories } from '../data/dishes'
import { saveCart, loadCart, saveHistory, loadHistory, saveTotalOrders, loadTotalOrders } from '../utils/storage'

export const cart = ref<string[]>(loadCart())
export const history = ref<string[]>(loadHistory())
export const totalOrders = ref<number>(loadTotalOrders())
export const currentPage = ref<string>('menu')
export const activeCategory = ref<string>(categories[0])
export const selectedDish = ref<string | null>(null)

watch(cart, (newCart) => {
  saveCart(newCart)
}, { deep: true })

watch(history, (newHistory) => {
  saveHistory(newHistory)
}, { deep: true })

watch(totalOrders, (newCount) => {
  saveTotalOrders(newCount)
})

export const filteredDishes = computed(() => {
  return dishes.filter(dish => dish.category === activeCategory.value)
})

export const cartDishes = computed(() => {
  return cart.value.map(id => dishes.find(dish => dish.id === id)).filter(Boolean)
})

export const historyDishes = computed(() => {
  const uniqueIds = [...new Set(history.value)]
  return uniqueIds.map(id => dishes.find(dish => dish.id === id)).filter(Boolean).reverse()
})

export function addToCart(dishId: string) {
  if (!cart.value.includes(dishId)) {
    cart.value.push(dishId)
    if (!history.value.includes(dishId)) {
      history.value.push(dishId)
    }
    totalOrders.value++
  }
}

export function removeFromCart(dishId: string) {
  const index = cart.value.indexOf(dishId)
  if (index > -1) {
    cart.value.splice(index, 1)
  }
}

export function clearCart() {
  cart.value = []
}

export function setCurrentPage(page: string) {
  currentPage.value = page
}

export function setActiveCategory(category: string) {
  activeCategory.value = category
}

export function selectDish(dishId: string | null) {
  selectedDish.value = dishId
}

export function getDishById(id: string | null) {
  if (!id) return null
  return dishes.find(dish => dish.id === id) || null
}
