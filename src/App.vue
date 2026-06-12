<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import DishDetail from './components/DishDetail.vue'
import MenuPage from './views/MenuPage.vue'
import CartPage from './views/CartPage.vue'
import ProfilePage from './views/ProfilePage.vue'
import { currentPage } from './stores/store'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Transition name="fade" mode="out-in">
      <MenuPage v-if="currentPage === 'menu'" />
      <CartPage v-else-if="currentPage === 'cart'" />
      <ProfilePage v-else-if="currentPage === 'profile'" />
    </Transition>
    <Navbar />
    <DishDetail />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
