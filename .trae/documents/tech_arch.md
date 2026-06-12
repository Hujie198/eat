# 家常菜点菜工具 - 技术架构文档

## 1. 技术选型

### 1.1 前端框架
- **框架**: Vue 3 + Vite
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **图标**: Lucide Vue
- **状态管理**: Vue Composition API + localStorage

### 1.2 构建工具
- **构建工具**: Vite 6.x
- **包管理器**: npm

### 1.3 数据存储
- **本地存储**: localStorage
- **数据格式**: JSON

---

## 2. 项目结构

```
src/
├── components/          # 组件目录
│   ├── Navbar.vue       # 底部导航栏
│   ├── CategoryList.vue # 菜系列表
│   ├── DishCard.vue     # 菜品卡片
│   ├── DishDetail.vue   # 菜品详情弹窗
│   └── CartItem.vue     # 购物车项
├── views/               # 页面视图
│   ├── MenuPage.vue     # 菜单页面
│   ├── CartPage.vue     # 干饭页面
│   └── ProfilePage.vue  # 我的页面
├── data/                # 数据文件
│   └── dishes.ts        # 菜品mock数据
├── stores/              # 状态管理
│   └── store.ts         # 全局状态
├── utils/               # 工具函数
│   └── storage.ts       # localStorage工具
├── App.vue              # 主应用组件
├── main.ts              # 入口文件
└── style.css            # 全局样式
```

---

## 3. 核心组件设计

### 3.1 Navbar 组件
- **功能**: 底部导航，切换页面
- **属性**: 
  - `currentPage`: 当前页面标识
- **事件**:
  - `change`: 切换页面事件

### 3.2 CategoryList 组件
- **功能**: 展示菜系分类列表
- **属性**:
  - `categories`: 菜系数组
  - `active`: 当前选中菜系
- **事件**:
  - `select`: 选择菜系事件

### 3.3 DishCard 组件
- **功能**: 展示单个菜品卡片
- **属性**:
  - `dish`: 菜品对象
- **事件**:
  - `add`: 添加到购物车
  - `detail`: 查看详情

### 3.4 DishDetail 组件
- **功能**: 菜品详情弹窗
- **属性**:
  - `dish`: 菜品对象
  - `visible`: 是否显示
- **事件**:
  - `close`: 关闭弹窗
  - `add`: 添加到购物车

---

## 4. 页面设计

### 4.1 MenuPage (菜单页)
- **布局**: 左侧菜系分类 + 右侧菜品列表
- **功能**:
  - 展示所有菜系
  - 展示选中菜系的菜品
  - 支持添加到购物车
  - 显示销量

### 4.2 CartPage (干饭页)
- **布局**: 菜品列表 + 清除按钮
- **功能**:
  - 展示已选菜品
  - 支持清除全部
  - 点击查看详情

### 4.3 ProfilePage (我的页)
- **布局**: 统计信息 + 历史记录列表
- **功能**:
  - 显示总点菜次数
  - 展示点菜历史

---

## 5. 数据模型

### 5.1 菜品模型
```typescript
interface Dish {
  id: string;
  name: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sales: number;
  ingredients: string[];
  steps: string[];
  image: string;
}
```

### 5.2 状态模型
```typescript
interface AppState {
  cart: string[];           // 购物车菜品ID列表
  history: string[];        // 历史记录菜品ID列表
  totalOrders: number;      // 总点菜次数
  currentPage: string;      // 当前页面
  activeCategory: string;   // 当前选中菜系
}
```

---

## 6. API设计

### 6.1 存储API
| 方法 | 功能 | 参数 | 返回值 |
|------|------|------|--------|
| `saveCart(cart)` | 保存购物车 | `cart: string[]` | `void` |
| `loadCart()` | 加载购物车 | 无 | `string[]` |
| `saveHistory(history)` | 保存历史 | `history: string[]` | `void` |
| `loadHistory()` | 加载历史 | 无 | `string[]` |
| `saveTotalOrders(count)` | 保存总次数 | `count: number` | `void` |
| `loadTotalOrders()` | 加载总次数 | 无 | `number` |

---

## 7. 部署方案

### 7.1 开发环境
```bash
npm install
npm run dev
```

### 7.2 生产构建
```bash
npm run build
```

### 7.3 部署目标
- 静态文件托管
- 支持CDN加速

---

## 8. 安全性考虑

- 数据仅存储在客户端，无需后端认证
- localStorage数据加密（可选）
- 输入数据验证
- 防止XSS攻击