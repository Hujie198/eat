App({
  globalData: {
    cart: [],
    history: [],
    totalOrders: 0
  },

  onLaunch: function () {
    this.loadData()
  },

  loadData: function () {
    try {
      const cart = wx.getStorageSync('cart')
      const history = wx.getStorageSync('history')
      const totalOrders = wx.getStorageSync('totalOrders')
      
      if (cart) this.globalData.cart = cart
      if (history) this.globalData.history = history
      if (totalOrders) this.globalData.totalOrders = totalOrders
    } catch (e) {
      console.error('加载数据失败', e)
    }
  },

  saveData: function () {
    try {
      wx.setStorageSync('cart', this.globalData.cart)
      wx.setStorageSync('history', this.globalData.history)
      wx.setStorageSync('totalOrders', this.globalData.totalOrders)
    } catch (e) {
      console.error('保存数据失败', e)
    }
  },

  addToCart: function (dishId) {
    if (!this.globalData.cart.includes(dishId)) {
      this.globalData.cart.push(dishId)
      if (!this.globalData.history.includes(dishId)) {
        this.globalData.history.push(dishId)
      }
      this.globalData.totalOrders++
      this.saveData()
    }
  },

  removeFromCart: function (dishId) {
    const index = this.globalData.cart.indexOf(dishId)
    if (index > -1) {
      this.globalData.cart.splice(index, 1)
      this.saveData()
    }
  },

  clearCart: function () {
    this.globalData.cart = []
    this.saveData()
  },

  exportCartData: function () {
    const data = {
      cart: this.globalData.cart,
      history: this.globalData.history,
      totalOrders: this.globalData.totalOrders
    }
    return btoa(JSON.stringify(data))
  },

  importCartData: function (encodedData) {
    try {
      const data = JSON.parse(atob(encodedData))
      this.globalData.cart = data.cart || []
      this.globalData.history = data.history || []
      this.globalData.totalOrders = data.totalOrders || 0
      this.saveData()
      return true
    } catch (e) {
      return false
    }
  }
})
