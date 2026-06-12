<script setup lang="ts">import { ShoppingCart, Eye } from 'lucide-vue-next';
import type { Dish } from '../data/dishes';
import { addToCart, selectDish } from '../stores/store';
defineProps<{
 dish: Dish;
}>();
const difficultyLabels: Record<string, string> = {
 easy: '简单',
 medium: '中等',
 hard: '困难'
};
</script>

<template>
  <div class="dish-card p-4 flex flex-col">
    <div class="relative mb-3">
      <img :src="dish.image" :alt="dish.name" class="w-full h-32 object-cover rounded-lg" />
      <span class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium" :class="`difficulty-${dish.difficulty}`">
        {{ difficultyLabels[dish.difficulty] }}
      </span>
    </div>
    <h3 class="font-semibold text-gray-800 mb-1 truncate">{{ dish.name }}</h3>
    <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
      <span class="flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
        </svg>
        {{ dish.sales }}
      </span>
    </div>
    <div class="flex gap-2 mt-auto">
      <button
        @click="selectDish(dish.id)"
        class="flex-1 btn-secondary flex items-center justify-center gap-1 text-sm"
      >
        <Eye class="w-4 h-4" />
        查看
      </button>
      <button
        @click="addToCart(dish.id)"
        class="flex-1 btn-primary flex items-center justify-center gap-1 text-sm"
      >
        <ShoppingCart class="w-4 h-4" />
        添加
      </button>
    </div>
  </div>
</template>
