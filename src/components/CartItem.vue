<script setup lang="ts">
import { Trash2, Eye } from 'lucide-vue-next'
import type { Dish } from '../data/dishes'
import { removeFromCart, selectDish } from '../stores/store'

defineProps<{
  dish: Dish
}>()

const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}
</script>

<template>
  <div class="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
    <img :src="dish.image" :alt="dish.name" class="w-20 h-20 object-cover rounded-lg" />
    <div class="flex-1 min-w-0">
      <h3 class="font-semibold text-gray-800 truncate">{{ dish.name }}</h3>
      <div class="flex items-center gap-2 mt-1">
        <span class="text-xs px-2 py-0.5 rounded-full" :class="`difficulty-${dish.difficulty}`">
          {{ difficultyLabels[dish.difficulty] }}
        </span>
        <span class="text-xs text-gray-500">{{ dish.category }}</span>
      </div>
    </div>
    <div class="flex gap-2">
      <button @click="selectDish(dish.id)" class="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 rounded-lg transition-colors">
        <Eye class="w-5 h-5" />
      </button>
      <button @click="removeFromCart(dish.id)" class="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
        <Trash2 class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
