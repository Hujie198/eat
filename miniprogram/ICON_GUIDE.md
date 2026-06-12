# 微信小程序图标说明

由于微信小程序的 tabBar 需要真实的 PNG 图标文件，你需要准备以下图标：

## 需要的图标文件

| 文件路径 | 用途 | 尺寸 |
|----------|------|------|
| images/menu.png | 菜单页图标（未选中） | 81×81 px |
| images/menu-active.png | 菜单页图标（选中） | 81×81 px |
| images/cart.png | 干饭页图标（未选中） | 81×81 px |
| images/cart-active.png | 干饭页图标（选中） | 81×81 px |
| images/user.png | 我的页图标（未选中） | 81×81 px |
| images/user-active.png | 我的页图标（选中） | 81×81 px |

## 获取图标的方法

1. **使用图标生成工具**
   - 访问 https://www.iconfont.cn/ 搜索图标
   - 下载 PNG 格式，尺寸选择 81×81 px

2. **使用在线工具创建**
   - 访问 https://www.pixlr.com/ 在线制作简单图标
   - 创建 81×81 像素的 PNG 图片

3. **使用代码生成**
   ```bash
   # 在 Linux/Mac 上使用 ImageMagick 创建简单图标
   convert -size 81x81 xc:white -fill "#999" -draw "circle 40,40 40,10" menu.png
   convert -size 81x81 xc:white -fill "#6366f1" -draw "circle 40,40 40,10" menu-active.png
   ```

## 目录结构

创建完成后的目录结构应该是：

```
miniprogram/
├── app.js
├── app.json
├── app.wxss
├── sitemap.json
├── data/
│   └── dishes.js
├── images/
│   ├── menu.png
│   ├── menu-active.png
│   ├── cart.png
│   ├── cart-active.png
│   ├── user.png
│   └── user-active.png
└── pages/
    ├── menu/
    │   ├── index.js
    │   └── index.wxml
    ├── cart/
    │   ├── index.js
    │   └── index.wxml
    └── profile/
        ├── index.js
        └── index.wxml
```

## 开发和发布

1. **打开微信开发者工具**
2. 选择 "导入项目"
3. 选择 miniprogram 目录
4. 填写 AppID（如果没有可以选择测试号）
5. 点击 "导入"

## 功能说明

- **菜单页**: 浏览各个菜系的菜品，查看详情，添加到购物车
- **干饭页**: 查看购物车内容，清空购物车
- **我的页**: 查看统计数据，导入/导出购物车数据
