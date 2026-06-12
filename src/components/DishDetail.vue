<script setup lang="ts">
import { X, ShoppingCart, BookOpen, List } from 'lucide-vue-next'
import { selectedDish, getDishById, selectDish, addToCart } from '../stores/store'

const dish = computed(() => getDishById(selectedDish.value))

import { computed } from 'vue'

const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}

function handleAdd() {
  if (dish.value) {
    addToCart(dish.value.id)
    selectDish(null)
  }
}

function handleClose() {
  selectDish(null)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="selectedDish && dish" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="handleClose">
        <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="relative">
            <img :src="dish.image" :alt="dish.name" class="w-full h-48 object-cover rounded-t-2xl" />
            <button @click="handleClose" class="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors">
              <X class="w-5 h-5 text-gray-600" />
            </button>
            <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium" :class="`difficulty-${dish.difficulty}`">
              {{ difficultyLabels[dish.difficulty] }}
            </span>
          </div>
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ dish.name }}</h2>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>{{ dish.category }}</span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                </svg>
                销量: {{ dish.sales }}
              </span>
            </div>
            <div class="mb-6">
              <h3 class="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <List class="w-5 h-5 mr-2 text-primary-500" />
                食材清单
              </h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="ingredient in dish.ingredients" :key="ingredient" class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {{ ingredient }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <BookOpen class="w-5 h-5 mr-2 text-primary-500" />
                烹饪步骤
              </h3>
              <ol class="space-y-3">
                <li v-for="(step, index) in dish.steps" :key="index" class="flex gap-3">
                  <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary-500 text-white rounded-full text-sm font-medium">
                    {{ index + 1 }}
                  </span>
                  <span class="text-gray-700">{{ step }}</span>
                </li>
              </ol>
            </div>
            <button @click="handleAdd" class="mt-6 w-full btn-primary flex items-center justify-center gap-2">
              <ShoppingCart class="w-5 h-5" />
              添加到干饭列表
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>
