<Page({
  data: {
    categories: [],
    activeCategory: '',
    dishes: [],
    selectedDish: null,
    showModal: false,
    categoryEmojis: {}
  },

  onLoad: function () {
    const { categories, categoryEmojis, getDishesByCategory } = require('../../data/dishes.js')
    
    this.setData({
      categories: categories,
      activeCategory: categories[0],
      dishes: getDishesByCategory(categories[0]),
      categoryEmojis: categoryEmojis
    })
  },

  onShow: function () {
    this.refreshData()
  },

  refreshData: function () {
    const { getDishesByCategory } = require('../../data/dishes.js')
    this.setData({
      dishes: getDishesByCategory(this.data.activeCategory)
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

  addToCart: function () {
    if (!this.data.selectedDish) return
    
    const app = getApp()
    app.addToCart(this.data.selectedDish.id)
    
    wx.showToast({
      title: '已添加',
      icon: 'success'
    })
    
    this.closeModal()
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
