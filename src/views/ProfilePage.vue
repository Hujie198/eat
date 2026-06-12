<script setup lang="ts">
import { ref } from 'vue'
import { User, History, ShoppingBag, Award, Share2, Download, CheckCircle } from 'lucide-vue-next'
import { historyDishes, totalOrders, selectDish, exportCartData, importCartData } from '../stores/store'
import { categoryEmojis } from '../data/dishes'

const difficultyLabels: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}

const shareCode = ref('')
const importCode = ref('')
const showShareModal = ref(false)
const showImportModal = ref(false)
const importSuccess = ref(false)

function handleExport() {
  shareCode.value = exportCartData()
  showShareModal.value = true
}

function copyShareCode() {
  navigator.clipboard.writeText(shareCode.value)
}

function handleImport() {
  if (importCartData(importCode.value)) {
    importSuccess.value = true
    setTimeout(() => {
      showImportModal.value = false
      importSuccess.value = false
      importCode.value = ''
    }, 2000)
  } else {
    alert('导入失败，请检查分享码是否正确')
  }
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
      <div class="bg-white rounded-2xl shadow-lg p-4 mb-4">
        <h2 class="font-semibold text-gray-800 mb-3">数据共享</h2>
        <div class="flex gap-3">
          <button
            @click="handleExport"
            class="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Share2 class="w-5 h-5" />
            导出购物车
          </button>
          <button
            @click="showImportModal = true"
            class="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <Download class="w-5 h-5" />
            导入购物车
          </button>
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
    
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showShareModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="showShareModal = false">
          <div class="bg-white rounded-2xl max-w-sm w-full p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">分享购物车</h3>
            <p class="text-gray-600 text-sm mb-4">复制下方分享码发给家人，他们可以导入你的购物车数据</p>
            <div class="bg-gray-100 rounded-lg p-4 mb-4 break-all text-center font-mono text-sm">
              {{ shareCode }}
            </div>
            <div class="flex gap-3">
              <button @click="showShareModal = false" class="flex-1 btn-secondary">
                关闭
              </button>
              <button @click="copyShareCode" class="flex-1 btn-primary">
                复制分享码
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showImportModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="showImportModal = false">
          <div class="bg-white rounded-2xl max-w-sm w-full p-6">
            <div v-if="importSuccess" class="flex flex-col items-center py-8">
              <CheckCircle class="w-16 h-16 text-green-500 mb-3" />
              <h3 class="text-lg font-bold text-gray-800">导入成功</h3>
            </div>
            <template v-else>
              <h3 class="text-lg font-bold text-gray-800 mb-4">导入购物车</h3>
              <p class="text-gray-600 text-sm mb-4">粘贴家人分享的购物车分享码</p>
              <textarea
                v-model="importCode"
                placeholder="请输入分享码..."
                class="w-full h-32 bg-gray-100 rounded-lg p-4 mb-4 text-sm"
              ></textarea>
              <div class="flex gap-3">
                <button @click="showImportModal = false" class="flex-1 btn-secondary">
                  取消
                </button>
                <button @click="handleImport" class="flex-1 btn-primary">
                  导入
                </button>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
