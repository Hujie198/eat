<script setup lang="ts">
import { List, ShoppingCart, User } from 'lucide-vue-next'
import { currentPage, setCurrentPage } from '../stores/store'

const navItems = [
  { id: 'menu', label: '菜单', icon: List },
  { id: 'cart', label: '干饭', icon: ShoppingCart },
  { id: 'profile', label: '我的', icon: User }
]
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div class="flex justify-around items-center h-16 max-w-lg mx-auto">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="setCurrentPage(item.id)"
        class="flex flex-col items-center justify-center w-20 h-full transition-all duration-200"
        :class="{ 'text-primary-500': currentPage === item.id, 'text-gray-400': currentPage !== item.id }"
      >
        <component :is="item.icon" class="w-6 h-6 mb-1" />
        <span class="text-xs font-medium">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
