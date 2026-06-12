Page({
  data: {
    totalOrders: 0,
    historyDishes: [],
    categoryEmojis: {},
    shareCode: '',
    showShareModal: false,
    showImportModal: false,
    importCode: '',
    importSuccess: false
  },

  onShow: function () {
    this.refreshData()
  },

  refreshData: function () {
    const app = getApp()
    const { getDishById, categoryEmojis } = require('../../data/dishes.js')
    
    const uniqueIds = [...new Set(app.globalData.history)]
    const historyDishes = uniqueIds.map(id => getDishById(id)).filter(Boolean).reverse()
    
    this.setData({
      totalOrders: app.globalData.totalOrders,
      historyDishes: historyDishes,
      categoryEmojis: categoryEmojis
    })
  },

  showDishDetail: function (e) {
    const dishId = e.currentTarget.dataset.id
    const { getDishById } = require('../../data/dishes.js')
    
    wx.showModal({
      title: getDishById(dishId)?.name || '',
      content: `食材：${getDishById(dishId)?.ingredients.join('、')}\n\n做法：${getDishById(dishId)?.steps.join('\n')}`,
      showCancel: true,
      cancelText: '关闭',
      confirmText: '添加到购物车',
      success: (res) => {
        if (res.confirm) {
          const app = getApp()
          app.addToCart(dishId)
          wx.showToast({
            title: '已添加',
            icon: 'success'
          })
        }
      }
    })
  },

  exportCart: function () {
    const app = getApp()
    this.setData({
      shareCode: app.exportCartData(),
      showShareModal: true
    })
  },

  copyShareCode: function () {
    wx.setClipboardData({
      data: this.data.shareCode,
      success: () => {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        })
      }
    })
  },

  closeShareModal: function () {
    this.setData({
      showShareModal: false
    })
  },

  showImportModal: function () {
    this.setData({
      showImportModal: true,
      importCode: '',
      importSuccess: false
    })
  },

  closeImportModal: function () {
    this.setData({
      showImportModal: false,
      importCode: '',
      importSuccess: false
    })
  },

  importCart: function () {
    if (!this.data.importCode) {
      wx.showToast({
        title: '请输入分享码',
        icon: 'none'
      })
      return
    }
    
    const app = getApp()
    if (app.importCartData(this.data.importCode)) {
      this.setData({
        importSuccess: true
      })
      this.refreshData()
      setTimeout(() => {
        this.closeImportModal()
      }, 2000)
    } else {
      wx.showToast({
        title: '导入失败',
        icon: 'none'
      })
    }
  },

  getDifficultyLabel: function (difficulty) {
    const labels = {
      easy: '简单',
      medium: '中等',
      hard: '困难'
    }
    return labels[difficulty] || difficulty
  }
})
