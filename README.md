![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt3-template/dev/nuxt/master?color=00dc82)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt3-template/dev/tailwindcss/master?color=0ea5e9)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt3-template/dev/pinia/master?color=ffd859)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt3-template/dev/%40vueuse%2Fnuxt/master?color=41b883)　![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt3-template/%40headlessui%2Fvue?color=69bdfe)　![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/tingminitime/nuxt3-template/dev/eslint/master?color=4B32C3)

# 104 緣來如此 ( 專業人才媒合網站 ) - 前端

![專案封面圖](https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2F104%E7%B7%A3%E4%BE%86%E5%A6%82%E6%AD%A4-%E5%B0%81%E9%9D%A2.png?alt=media&token=3f17c7e4-a691-46f5-9943-5b953ccef2af)


- [前端 DEMO ](https://104social-front-end.vercel.app/)
- [後端 Swagger](https://104-dev.zeabur.app/api-doc/#/)
- [後端 GitHub ](https://github.com/roceil/104_Backend/tree/main/)

## 功能

- [測試流程 (Notion)](https://www.notion.so/7bad45f87c9c40ba986bb7a85fc90164?pvs=4)
- 測試帳號密碼 (成果發表期間，暫不提供)

```bash
邀約方
```
<!-- 帳號： snowman12320@gmail.com
密碼： a1234567 -->
```bash
被邀約方
```
<!-- 帳號： 56asdf01@hotmail.com
密碼： a1234567 -->

### 登出登入

- [x] 一般登入
- [x] 第三方登入
- [x] 註冊贈送點數
- [x] 登出

### 會員中心

- [x] 會員資料修改
- [x] 會員圖片上傳
- [x] 自訂資料是否揭露

### 配對

- [x] 配對條件設定
- [x] 配對結果列表

### 邀約

- [x] 我邀約誰列表
- [x] 誰邀約我列表
- [x] 主動邀約
- [x] 加入拒絕往來對象
- [x] 接受邀約
- [x] 拒絕邀約
- [x] 移除對象

### 收藏

- [x] 我的收藏記錄
- [x] 收藏心儀對象

### 評價

- [x] 我留下的評價列表
- [x] 解鎖評價

### 點數儲值

- [x] 儲值點數
- [x] 藍新金流付款

### 聊天室

- [x] 與心儀對象聊天
- [x] 封鎖對方

### 尋找對象

- [x] 自訂搜尋條件
- [x] 搜尋列表
- [x] 系統推薦可能喜歡的對象

## 畫面

> 搜尋對象

![搜尋對象](https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2F%E5%B0%8B%E6%89%BE%E5%B0%8D%E8%B1%A1.png?alt=media&token=e1433dd9-8d0f-49bd-ba03-11ca3a4df530)

<!-- ![搜尋對象](https://img.onl/Zdoym2) -->

> 我的邀約列表
...
<!-- ![我的邀約列表](https://img.onl/vJidF) -->

<!-- ![我的邀約列表](https://img.onl/n1QIjJ) -->

> 會員資料
...
<!-- ![會員資料](https://img.onl/hb48Ft) -->

<!-- ![會員資料](https://img.onl/cUkZYl) -->

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。

### 取得專案

```bash
git clone https://github.com/south-second-group/104social-front-end.git
```

### 移動到專案內

```bash
cd 104social-front-end
```

### 安裝套件

> pnpm 版本建議為：`8.12.1`

```bash
pnpm install
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案

```bash
pnpm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:3000/
```

## 資料夾說明

- api - API 檔案放置處
- assets - 靜態資源放置處
  - css - css 檔案放置處
  - img - 圖片放置處
- components - 元件放置處
- composables - 組合模組放置處
- constants - Google 搜尋關鍵字放置處
- layouts - 網站布局組件放置處
- lib - 工具函数放置處
- middleware - 預處理邏輯放置處
- pages - 畫面放置處
- public - 靜態文件資源放置處
- server - 服務器邏輯放置處
- store - 狀態管理資源放置處

## 專案技術

- Nuxt v3.11.1
- Pinia v2.1.7
- Vue Router v4.3.0
- Nuxt/ui v2.15.2
- Tailwind CSS v3.4.1
- ESLint v8.57.0

## 第三方服務

- Gemini AI
- Google OAuth
- Firebase Storage
- 藍新金流

## CI/CD 說明

此專案 merge 到 main 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 執行 ESLint 掃描
- 執行測試
- 部署到 GitHub Pages