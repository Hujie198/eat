<script setup lang="ts">
import CategoryList from '../components/CategoryList.vue'
import DishCard from '../components/DishCard.vue'
import { filteredDishes, activeCategory } from '../stores/store'
</script>

<template>
  <div class="page-container">
    <header class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-5 shadow-lg">
      <h1 class="text-2xl font-bold">家常菜点菜</h1>
      <p class="text-primary-100 text-sm mt-1">选择你想吃的菜系</p>
    </header>
    <CategoryList />
    <div class="p-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-800">{{ activeCategory }}</h2>
        <span class="text-sm text-gray-500">共 {{ filteredDishes.length }} 道菜</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <DishCard v-for="dish in filteredDishes" :key="dish.id" :dish="dish" />
      </div>
    </div>
  </div>
</template>
