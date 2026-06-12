App({
  globalData: {
    cart: [],
    history: [],
    totalOrders: 0,
    cartId: '',
    cloudReady: false,
    watcher: null
  },

  onLaunch: function () {
    // 初始化云开发
    try {
      if (wx.cloud) {
        wx.cloud.init({
          env: 'home-cooking-app', // TODO: 替换为你的云环境ID
          traceUser: true
        })
        this.globalData.cloudReady = true
      }
    } catch (e) {
      console.warn('云开发初始化失败，将使用本地存储', e)
      this.globalData.cloudReady = false
    }

    // 从本地存储加载数据
    const cart = wx.getStorageSync('cart') || []
    const history = wx.getStorageSync('history') || []
    const totalOrders = wx.getStorageSync('totalOrders') || 0
    let cartId = wx.getStorageSync('cartId') || ''

    // 如果没有购物车ID，生成一个
    if (!cartId) {
      cartId = 'cart_' + Date.now()
      wx.setStorageSync('cartId', cartId)
    }

    this.globalData.cart = cart
    this.globalData.history = history
    this.globalData.totalOrders = totalOrders
    this.globalData.cartId = cartId

    // 如果云开发可用，启动云数据库监听
    if (this.globalData.cloudReady) {
      this.setupCloudSync()
    }
  },

  // 设置云数据库实时同步
  setupCloudSync: function () {
    const db = wx.cloud.database()
    const cartId = this.globalData.cartId
    const that = this

    // 尝试从云端读取数据
    db.collection('cart').doc(cartId).get().then(res => {
      if (res.data) {
        // 云端存在数据，以云端为准
        that.globalData.cart = res.data.dishes || []
        that.globalData.history = res.data.history || []
        that.globalData.totalOrders = res.data.totalOrders || 0
        that.saveToLocal()
      } else {
        // 云端没有数据，创建新记录
        that.syncToCloud()
      }
    }).catch(err => {
      console.warn('读取云端数据失败，将创建新记录', err)
      that.syncToCloud()
    })

    // 设置实时监听
    try {
      const watch = db.collection('cart').doc(cartId).watch({
        onChange: function (snapshot) {
          if (snapshot.docChanges && snapshot.docChanges.length > 0) {
            const updatedDoc = snapshot.docChanges[0].doc
            if (updatedDoc) {
              that.globalData.cart = updatedDoc.dishes || []
              that.globalData.history = updatedDoc.history || []
              that.globalData.totalOrders = updatedDoc.totalOrders || 0
              that.saveToLocal()
              that.notifyPages()
            }
          }
        },
        onError: function (err) {
          console.warn('数据库监听错误', err)
        }
      })
      this.globalData.watcher = watch
    } catch (e) {
      console.warn('数据库监听失败，不影响使用', e)
    }
  },

  // 同步到云数据库
  syncToCloud: function () {
    if (!this.globalData.cloudReady) {
      return // 云开发未配置，不同步
    }

    const db = wx.cloud.database()
    const cartId = this.globalData.cartId

    // 先尝试更新，失败则创建
    db.collection('cart').doc(cartId).set({
      data: {
        dishes: this.globalData.cart,
        history: this.globalData.history,
        totalOrders: this.globalData.totalOrders,
        updatedAt: new Date()
      }
    }).then(res => {
      console.log('同步成功')
    }).catch(err => {
      // 文档不存在时创建
      if (err.errCode === -1 || err.errCode === 40101) {
        db.collection('cart').add({
          data: {
            _id: cartId,
            dishes: this.globalData.cart,
            history: this.globalData.history,
            totalOrders: this.globalData.totalOrders,
            updatedAt: new Date()
          }
        }).then(() => {
          console.log('创建云端记录成功')
        }).catch(createErr => {
          console.warn('创建云端记录失败', createErr)
        })
      } else {
        console.warn('同步失败', err)
      }
    })
  },

  // 保存到本地
  saveToLocal: function () {
    try {
      wx.setStorageSync('cart', this.globalData.cart)
      wx.setStorageSync('history', this.globalData.history)
      wx.setStorageSync('totalOrders', this.globalData.totalOrders)
    } catch (e) {
      console.error('保存到本地失败', e)
    }
  },

  // 通知页面刷新数据
  notifyPages: function () {
    const pages = getCurrentPages()
    pages.forEach(page => {
      if (page.refreshCart) {
        try {
          page.refreshCart()
        } catch (e) {
          console.warn('刷新页面失败', e)
        }
      }
    })
  },

  // 添加到购物车
  addToCart: function (dishId) {
    if (!this.globalData.cart.includes(dishId)) {
      this.globalData.cart.push(dishId)
      if (!this.globalData.history.includes(dishId)) {
        this.globalData.history.push(dishId)
      }
      this.globalData.totalOrders++
      this.saveToLocal()
      this.syncToCloud()
      this.notifyPages()
      return true
    }
    return false
  },

  // 从购物车移除
  removeFromCart: function (dishId) {
    const index = this.globalData.cart.indexOf(dishId)
    if (index > -1) {
      this.globalData.cart.splice(index, 1)
      this.saveToLocal()
      this.syncToCloud()
      this.notifyPages()
      return true
    }
    return false
  },

  // 清空购物车
  clearCart: function () {
    this.globalData.cart = []
    this.saveToLocal()
    this.syncToCloud()
    this.notifyPages()
  }
})
