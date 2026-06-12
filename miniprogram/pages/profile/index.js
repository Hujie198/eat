Page({
  data: {
    totalOrders: 0,
    historyCount: 0,
    historyDishes: [],
    categoryEmojis: {},
    cartId: '',
    showShareModal: false,
    showJoinModal: false,
    copied: false,
    inputCartId: ''
  },

  onLoad: function () {
    this.refreshData()
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
      historyCount: uniqueIds.length,
      historyDishes: historyDishes,
      categoryEmojis: categoryEmojis,
      cartId: app.globalData.cartId
    })

    // 同步tabbar角标
    if (app.globalData.cart.length > 0) {
      wx.setTabBarBadge({
        index: 1,
        text: String(app.globalData.cart.length)
      })
    } else {
      wx.removeTabBarBadge({
        index: 1
      })
    }
  },

  showDishDetail: function (e) {
    const dishId = e.currentTarget.dataset.id
    const { getDishById } = require('../../data/dishes.js')
    const dish = getDishById(dishId)
    
    wx.showModal({
      title: dish?.name || '',
      content: `食材：${dish?.ingredients.join('、')}\n\n做法：${dish?.steps.join('\n')}`,
      showCancel: true,
      cancelText: '关闭',
      confirmText: '添加到购物车',
      success: (res) => {
        if (res.confirm) {
          const app = getApp()
          app.addToCart(dishId)
          this.refreshData()
          wx.showToast({
            title: '已添加',
            icon: 'success'
          })
        }
      }
    })
  },

  // 显示分享购物车弹窗
  showShareModal: function () {
    this.setData({
      showShareModal: true,
      copied: false
    })
  },

  closeShareModal: function () {
    this.setData({
      showShareModal: false
    })
  },

  copyCartId: function () {
    wx.setClipboardData({
      data: this.data.cartId,
      success: () => {
        this.setData({ copied: true })
        setTimeout(() => {
          this.setData({ copied: false })
        }, 2000)
      }
    })
  },

  // 显示加入共享购物车弹窗
  showJoinModal: function () {
    this.setData({
      showJoinModal: true,
      inputCartId: ''
    })
  },

  closeJoinModal: function () {
    this.setData({
      showJoinModal: false
    })
  },

  onInputCartId: function (e) {
    this.setData({
      inputCartId: e.detail.value
    })
  },

  // 加入共享购物车
  joinSharedCart: function () {
    const cartId = this.data.inputCartId.trim()
    if (!cartId) {
      wx.showToast({
        title: '请输入购物车ID',
        icon: 'none'
      })
      return
    }

    if (!cartId.startsWith('cart_')) {
      wx.showToast({
        title: 'ID格式不正确',
        icon: 'none'
      })
      return
    }

    const app = getApp()
    
    wx.showLoading({
      title: '正在加入...'
    })

    // 保存新的购物车ID
    app.globalData.cartId = cartId
    wx.setStorageSync('cartId', cartId)

    // 重置本地购物车数据，从云端拉取
    app.globalData.cart = []
    app.globalData.history = []
    app.globalData.totalOrders = 0
    app.saveToLocal()

    // 如果云开发可用，从云端拉取数据
    if (app.globalData.cloudReady) {
      const db = wx.cloud.database()
      db.collection('cart').doc(cartId).get().then(res => {
        wx.hideLoading()
        if (res.data) {
          app.globalData.cart = res.data.dishes || []
          app.globalData.history = res.data.history || []
          app.globalData.totalOrders = res.data.totalOrders || 0
          app.saveToLocal()
          this.refreshData()
          
          // 重新设置云端监听
          app.setupCloudSync()
          
          wx.showToast({
            title: '加入成功！',
            icon: 'success'
          })
        } else {
          // 云端无数据，创建新记录
          app.syncToCloud()
          this.refreshData()
          wx.showToast({
            title: '已加入共享',
            icon: 'success'
          })
        }
      }).catch(err => {
        wx.hideLoading()
        // 云端无数据也不报错，使用本地新的空记录
        this.refreshData()
        wx.showToast({
          title: '已加入共享',
          icon: 'success'
        })
      })
    } else {
      wx.hideLoading()
      this.refreshData()
      wx.showToast({
        title: '已加入共享',
        icon: 'success'
      })
      wx.showModal({
        title: '提示',
        content: '您尚未配置云开发，数据只能在本地使用。如需多人共享，请在微信开发者工具中启用云开发功能。',
        showCancel: false
      })
    }

    this.setData({
      showJoinModal: false,
      cartId: cartId
    })
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
