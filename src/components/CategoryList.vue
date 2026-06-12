<script setup lang="ts">
import { categories } from '../data/dishes'
import { activeCategory, setActiveCategory } from '../stores/store'
</script>

<template>
  <div class="bg-gray-50 p-3">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category"
        @click="setActiveCategory(category)"
        class="category-item text-sm font-medium px-4 py-2 rounded-full"
        :class="{ 'active': activeCategory === category, 'bg-gray-200 text-gray-600': activeCategory !== category }"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>
