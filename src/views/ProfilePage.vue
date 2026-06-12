<script setup lang="ts">
import { User, History, ShoppingBag, Award } from 'lucide-vue-next'
import { historyDishes, totalOrders, selectDish } from '../stores/store'
import { categoryEmojis } from '../data/dishes'

const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}
</script>

<template>
  <div class="page-container">
    <header class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-8 shadow-lg">
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3">
          <User class="w-10 h-10" />
        </div>
        <h1 class="text-xl font-bold">我的</h1>
      </div>
    </header>
    <div class="p-4 -mt-6">
      <div class="bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div class="flex items-center justify-around text-center">
          <div>
            <div class="text-2xl font-bold text-gray-800">{{ totalOrders }}</div>
            <div class="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
              <ShoppingBag class="w-4 h-4" />
              总点菜次数
            </div>
          </div>
          <div class="w-px h-12 bg-gray-200"></div>
          <div>
            <div class="text-2xl font-bold text-gray-800">{{ historyDishes.length }}</div>
            <div class="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
              <History class="w-4 h-4" />
              吃过的菜
            </div>
          </div>
          <div class="w-px h-12 bg-gray-200"></div>
          <div>
            <div class="text-2xl font-bold text-gray-800">8</div>
            <div class="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
              <Award class="w-4 h-4" />
              菜系探索
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-lg p-4">
        <h2 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <History class="w-5 h-5 text-purple-500" />
          点菜历史
        </h2>
        <div v-if="historyDishes.length > 0" class="space-y-2">
          <div
            v-for="dish in historyDishes"
            :key="dish.id"
            @click="selectDish(dish.id)"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">{{ categoryEmojis[dish.category] || '🍽️' }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-800 truncate">{{ dish.name }}</h3>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-xs px-2 py-0.5 rounded-full" :class="`difficulty-${dish.difficulty}`">
                  {{ difficultyLabels[dish.difficulty] }}
                </span>
                <span class="text-xs text-gray-500">{{ dish.category }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-10">
          <History class="w-12 h-12 text-gray-300 mb-3" />
          <p class="text-gray-500">暂无点菜记录</p>
        </div>
      </div>
    </div>
  </div>
</template>
