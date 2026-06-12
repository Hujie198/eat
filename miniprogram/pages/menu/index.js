Page({
  data: {
    categories: [],
    activeCategory: '',
    dishes: [],
    cartIds: [],
    cartCount: 0,
    selectedDish: null,
    showModal: false,
    categoryEmojis: {},
    // 动画相关
    animationItems: [],
    flyToCart: null,
    cartBounce: false
  },

  onLoad: function () {
    const { categories, categoryEmojis, getDishesByCategory } = require('../../data/dishes.js')
    
    this.setData({
      categories: categories,
      activeCategory: categories[0],
      dishes: getDishesByCategory(categories[0]),
      categoryEmojis: categoryEmojis,
      cartIds: getApp().globalData.cart,
      cartCount: getApp().globalData.cart.length
    })
  },

  onShow: function () {
    this.refreshCart()
  },

  // 刷新购物车数据
  refreshCart: function () {
    const app = getApp()
    const { getDishesByCategory } = require('../../data/dishes.js')
    
    this.setData({
      dishes: getDishesByCategory(this.data.activeCategory),
      cartIds: app.globalData.cart,
      cartCount: app.globalData.cart.length
    })
  },

  selectCategory: function (e) {
    const category = e.currentTarget.dataset.category
    const { getDishesByCategory } = require('../../data/dishes.js')
    
    this.setData({
      activeCategory: category,
      dishes: getDishesByCategory(category)
    })
  },

  showDishDetail: function (e) {
    const dishId = e.currentTarget.dataset.id
    const { getDishById } = require('../../data/dishes.js')
    
    this.setData({
      selectedDish: getDishById(dishId),
      showModal: true
    })
  },

  closeModal: function () {
    this.setData({
      showModal: false,
      selectedDish: null
    })
  },

  // 直接添加到购物车 + 动画
  addToCartDirect: function (e) {
    const dishId = e.currentTarget.dataset.id
    const { getDishById } = require('../../data/dishes.js')
    
    const app = getApp()
    
    // 如果已经在购物车里，不重复添加
    if (app.globalData.cart.includes(dishId)) {
      wx.showToast({
        title: '已在购物车中',
        icon: 'none'
      })
      return
    }
    
    app.addToCart(dishId)
    
    // 触发动画
    this.triggerFlyAnimation(e.currentTarget.offsetTop || 0)
    
    // 更新数据
    this.refreshCart()
    
    // 显示成功提示
    wx.showToast({
      title: '已添加',
      icon: 'success'
    })
  },

  // 从弹窗添加
  addToCart: function () {
    if (!this.data.selectedDish) return
    
    const app = getApp()
    
    if (app.globalData.cart.includes(this.data.selectedDish.id)) {
      wx.showToast({
        title: '已在购物车中',
        icon: 'none'
      })
      this.closeModal()
      return
    }
    
    app.addToCart(this.data.selectedDish.id)
    
    // 更新数据
    this.refreshCart()
    this.closeModal()
    
    wx.showToast({
      title: '已添加',
      icon: 'success'
    })
  },

  // 飞入购物车动画
  triggerFlyAnimation: function (top) {
    const animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-in'
    })
    
    // 弹跳动画
    animation.opacity(0.2).scale(0.3).translateY(200).step()
    
    // 播放购物车图标
    this.setData({
      flyToCart: animation.export(),
      cartBounce: true
    })
    
    setTimeout(() => {
      this.setData({
        flyToCart: null,
        cartBounce: false
      })
    }, 800)
  },

  // 跳转到干饭页
  goToCart: function () {
    wx.switchTab({
      url: '/pages/cart/index'
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
