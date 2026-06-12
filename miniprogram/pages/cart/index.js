Page({
  data: {
    cartDishes: [],
    cartCount: 0,
    categoryEmojis: {}
  },

  onLoad: function () {
    this.refreshCart()
  },

  onShow: function () {
    this.refreshCart()
  },

  // 刷新购物车 - 支持云数据库同步
  refreshCart: function () {
    const app = getApp()
    const { getDishById, categoryEmojis } = require('../../data/dishes.js')
    
    const cartDishes = app.globalData.cart.map(id => getDishById(id)).filter(Boolean)
    
    this.setData({
      cartDishes: cartDishes,
      cartCount: app.globalData.cart.length,
      categoryEmojis: categoryEmojis
    })
    
    // 动态设置tab bar角标
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

  // 显示菜品详情
  showDishDetail: function (e) {
    const dishId = e.currentTarget.dataset.id
    const { getDishById } = require('../../data/dishes.js')
    const dish = getDishById(dishId)
    
    wx.showModal({
      title: dish?.name || '',
      content: `食材：${dish?.ingredients.join('、')}\n\n做法：${dish?.steps.join('\n')}`,
      showCancel: true,
      cancelText: '关闭',
      confirmText: '去菜单',
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/menu/index'
          })
        }
      }
    })
  },

  // 从购物车移除
  removeFromCart: function (e) {
    const dishId = e.currentTarget.dataset.id
    const app = getApp()
    app.removeFromCart(dishId)
    this.refreshCart()
    
    wx.showToast({
      title: '已移除',
      icon: 'success'
    })
  },

  // 清空购物车
  clearCart: function () {
    if (this.data.cartCount === 0) {
      wx.showToast({
        title: '购物车是空的',
        icon: 'none'
      })
      return
    }
    
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp()
          app.clearCart()
          this.refreshCart()
          
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  // 去菜单页面
  goToMenu: function () {
    wx.switchTab({
      url: '/pages/menu/index'
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
