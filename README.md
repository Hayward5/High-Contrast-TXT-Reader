# HC-TXT-Reader（高對比 TXT 小說閱讀器）

[English](#english)｜[中文](#中文)

## English

HC-TXT-Reader is a privacy-first, dependency-free TXT novel reader delivered as one HTML file. Books are decoded and rendered locally; no book content is uploaded.

### Features

- Adaptive page layout plus continuous scrolling mode.
- Mouse, keyboard, on-screen controls, edge tap, and horizontal swipe navigation.
- UTF-8, Big5, GB18030, UTF-16 LE, and UTF-16 BE decoding selection.
- SHA-256 content identity when Web Crypto is available, with versioned local progress records.
- High-contrast, dark, paper, and light themes; font size and line-height controls.
- Automatic progress, manual bookmark, percentage jump, and full-text search.
- Browser text-to-speech with automatic page turning and adjustable speech rate.
- Dynamic viewport, safe-area support, visible keyboard focus, reduced-motion support, and accessible control names.
- Single-file, offline operation without a server or third-party dependency.

### Usage

1. Download `reader.html`.
2. Open it in a current Chrome, Edge, Firefox, or Safari browser.
3. Select **Open** and choose a `.txt` novel.
4. If text is garbled, open Settings (⚙) and select the correct encoding.

Progress and preferences are stored in the current browser. Clearing site data, using private browsing, changing browser/origin, or changing devices may remove or isolate that data. Speech voices and background TTS behavior depend on the browser and operating system.

### Controls

- `Left Arrow`: previous page.
- `Right Arrow` / `Space`: next page.
- Tap the left/right reading edge or swipe horizontally to turn pages.
- Tap the center of the reading area to toggle controls.
- Enter a percentage in the status bar to jump.
- Use Settings to change encoding, theme, mode, line height, and speech rate.

### Development

No build is required. Run the regression tests with:

```bash
node --test tests/reader-state.test.js
```

The approved roadmap and acceptance criteria are in [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md).

## 中文

HC-TXT-Reader 是一個重視隱私、無第三方依賴的單檔 TXT 小說閱讀器。小說只在使用者的瀏覽器中解碼與顯示，不會上傳正文。

### 最新功能

- **兩種閱讀模式**：自適應分頁及連續上下捲動。
- **跨裝置操作**：支援畫面按鈕、鍵盤、閱讀區左右點擊及水平滑動翻頁。
- **常見文字編碼**：可選 UTF-8、Big5、GB18030、UTF-16 LE 與 UTF-16 BE；亂碼時可直接切換，不必重新選檔。
- **穩定書籍識別**：瀏覽器支援 Web Crypto 時，以 SHA-256 內容 fingerprint 區分同名小說，並使用版本化進度資料。
- **閱讀外觀**：高對比、深色、紙張色與亮色主題，可調字級及行距。
- **閱讀記憶**：自動保存進度、手動書籤、百分比跳轉及全文搜尋。
- **語音朗讀**：使用瀏覽器 TTS，讀完目前頁面後自動翻頁，並可調整語速。
- **行動裝置適配**：支援動態 viewport、瀏海／Home Indicator 安全區域與觸控手勢。
- **無障礙基礎**：具控制項名稱、鍵盤焦點、狀態播報及 reduced-motion 支援。
- **離線單檔**：沒有後端、安裝程序、建置步驟或外部套件。

### 使用方法

1. 下載本 repo 的 `reader.html`。
2. 使用最新版 Chrome、Edge、Firefox 或 Safari 開啟。
3. 點選「開啟」，選擇 `.txt` 小說。
4. 若文字出現亂碼，點選 ⚙，從「編碼」選擇正確格式。

### 操作方式

- `←`：上一頁。
- `→` 或空白鍵：下一頁。
- 點閱讀區左／右側，或左右滑動：翻頁。
- 點閱讀區中央：顯示或隱藏控制介面。
- 修改底部百分比：跳到指定閱讀進度。
- ⚙ 設定：調整編碼、主題、分頁／捲動模式、行距與朗讀語速。

### 資料與隱私

- 小說內容只在本機瀏覽器處理。
- 閱讀進度及偏好存在目前瀏覽器的儲存空間。
- 清除網站資料、使用無痕模式、改用另一瀏覽器／網址或更換裝置時，資料可能不會保留或共用。
- TTS 可用語音、背景朗讀及長文穩定性取決於瀏覽器和作業系統。
- 尚未提供帳號或雲端同步；跨裝置匯出／匯入仍列於後續路線圖。

### 開發與測試

本專案不需建置。修改後執行：

```bash
node --test tests/reader-state.test.js
```

完整改善計畫、階段與驗收條件請參閱 [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md)。
