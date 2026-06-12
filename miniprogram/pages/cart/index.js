Page({
  data: {
    cartDishes: [],
    categoryEmojis: {}
  },

  onShow: function () {
    this.refreshCart()
  },

  refreshCart: function () {
    const app = getApp()
    const { getDishById, categoryEmojis } = require('../../data/dishes.js')
    
    const cartDishes = app.globalData.cart.map(id => getDishById(id)).filter(Boolean)
    
    this.setData({
      cartDishes: cartDishes,
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
      confirmText: '添加更多',
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/menu/index'
          })
        }
      }
    })
  },

  removeFromCart: function (e) {
    const dishId = e.currentTarget.dataset.id
    const app = getApp()
    app.removeFromCart(dishId)
    this.refreshCart()
    
    wx.showToast({
      title: '已移除',
      icon: 'none'
    })
  },

  clearCart: function () {
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

  getDifficultyLabel: function (difficulty) {
    const labels = {
      easy: '简单',
      medium: '中等',
      hard: '困难'
    }
    return labels[difficulty] || difficulty
  }
})
