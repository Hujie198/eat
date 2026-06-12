import { ref, computed, watch, onMounted } from 'vue'
import { dishes, categories } from '../data/dishes'
import { 
  listenToCart, 
  listenToHistory, 
  listenToTotalOrders, 
  updateCart, 
  updateHistory,
  incrementTotalOrders 
} from '../utils/firebase'

export const cart = ref<string[]>([])
export const history = ref<string[]>([])
export const totalOrders = ref<number>(0)
export const currentPage = ref<string>('menu')
export const activeCategory = ref<string>(categories[0])
export const selectedDish = ref<string | null>(null)

onMounted(() => {
  listenToCart((newCart) => {
    cart.value = newCart
  })
  
  listenToHistory((newHistory) => {
    history.value = newHistory
  })
  
  listenToTotalOrders((newCount) => {
    totalOrders.value = newCount
  })
})

watch(cart, (newCart) => {
  updateCart(newCart)
}, { deep: true })

watch(history, (newHistory) => {
  updateHistory(newHistory)
}, { deep: true })

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
    incrementTotalOrders()
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
