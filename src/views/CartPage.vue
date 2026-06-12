<script setup lang="ts">
import { Trash2, ShoppingCart } from 'lucide-vue-next'
import CartItem from '../components/CartItem.vue'
import { cartDishes, clearCart } from '../stores/store'
</script>

<template>
  <div class="page-container">
    <header class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-5 shadow-lg">
      <h1 class="text-2xl font-bold flex items-center gap-2">
        <ShoppingCart class="w-6 h-6" />
        干饭列表
      </h1>
      <p class="text-orange-100 text-sm mt-1">准备好开饭啦</p>
    </header>
    <div class="p-4">
      <div v-if="cartDishes.length > 0" class="flex justify-between items-center mb-4">
        <span class="text-gray-600">已选 {{ cartDishes.length }} 道菜</span>
        <button @click="clearCart" class="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors">
          <Trash2 class="w-4 h-4" />
          清除全部
        </button>
      </div>
      <div v-if="cartDishes.length > 0" class="space-y-3">
        <CartItem v-for="dish in cartDishes" :key="dish.id" :dish="dish" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-20">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart class="w-10 h-10 text-gray-400" />
        </div>
        <p class="text-gray-500">还没有选菜哦</p>
        <p class="text-sm text-gray-400 mt-1">去菜单页挑选美味吧</p>
      </div>
    </div>
  </div>
</template>
