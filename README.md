# Funtry 食光仓

一个简单的食材库存管理PWA应用。

## � 部署到GitHub Pages

### 步骤1：上传文件到GitHub
1. 创建一个新的GitHub仓库
2. 将以下文件上传到仓库：
   - `index.html` (主应用)
   - `data-export.html` (数据导出工具)
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `README.md`

### 步骤2：启用GitHub Pages
1. 进入仓库的 **Settings** 标签
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分选择 **Deploy from a branch**
4. 在 **Branch** 部分选择 **main** (或您的主分支)
5. 点击 **Save**

### 步骤3：获取访问链接
启用后，GitHub会提供一个链接，格式为：
```
https://[您的GitHub用户名].github.io/[仓库名]/
```

### 步骤4：验证部署
- 主应用：`https://[用户名].github.io/[仓库名]/`
- 数据导出工具：`https://[用户名].github.io/[仓库名]/data-export.html`

## 📱 功能特点

- 📦 食材库存管理
- 🛒 智能购物清单生成
- 📅 饮食计划安排
- 🔍 条形码扫描识别
- 💾 数据本地存储
- 🌐 PWA离线使用

## 🔄 从旧版本升级

### 备份数据
1. 在手机浏览器中打开：`https://[用户名].github.io/[仓库名]/data-export.html`
2. 点击"导出数据"按钮
3. 保存JSON文件

### 更新应用
1. 访问新版本：`https://[用户名].github.io/[仓库名]/`
2. 硬刷新页面（长按刷新按钮）
3. 导入备份的数据

## 📋 使用方法

1. 添加食材到库存
2. 规划饮食计划
3. 系统自动生成购物清单
4. 根据需要调整购物数量
5. 消费食材时标记使用

## 🔧 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- PWA (Service Worker)
- LocalStorage

## 📄 许可证

MIT License