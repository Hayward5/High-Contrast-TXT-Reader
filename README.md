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

### Complete feature reference

| Area | Included behavior |
| --- | --- |
| Local files | Opens `.txt` files with the browser File API, displays the selected filename, normalizes CRLF/CR line endings, and expands tabs to four spaces. Loading, empty-file, and read-error states are shown in the reading area. |
| Text decoding | Reads the original file as an `ArrayBuffer`. UTF-8 is the default; Big5, GB18030, UTF-16 LE, and UTF-16 BE can be selected without reopening the file. |
| Pagination | Measures the available rendered height with a binary search rather than using a fixed character count. It prefers a nearby newline or Chinese sentence-ending punctuation when breaking a page. |
| Reading modes | Supports adaptive page mode and continuous vertical scrolling mode. Resizing the window reflows the current content. |
| Navigation | Previous/next buttons, Left/Right Arrow, Space, percentage jump, left/right edge tap, and horizontal swipe. Manual navigation stops active speech. |
| Progress | Automatically saves the current character offset after rendering and restores it when the same book is reopened. Invalid or obsolete offsets are constrained to the current text. |
| Book identity | Uses a SHA-256 hash of the file bytes when Web Crypto is available. The fallback identity combines filename, size, and last-modified time. Legacy filename-based automatic progress remains readable. |
| Bookmark | Stores one manual bookmark per identified book, reports its percentage when saved, and asks for confirmation before restoring it. A legacy filename-based bookmark can still be restored. |
| Search | Searches the entire decoded text, returns up to the first 100 matches with surrounding context, highlights the query safely as text, and jumps to a selected result. |
| Speech | Selects a `zh-TW` voice when available, otherwise another Chinese voice or the first system voice. It reads the visible page, turns pages automatically, and offers start/stop and speech-rate control. |
| Appearance | Font size from 14–50 px, content brightness/opacity from 20–100%, line height from 1.4–2.0, and high-contrast, dark, paper, or light themes. |
| Responsive UI | Mobile toolbar compaction, full-width mobile search panel, dynamic viewport height, safe-area padding, and settings/control hiding for more reading space. |
| Accessibility | Traditional Chinese document language, semantic toolbar/main regions, accessible names on primary icon controls, visible keyboard focus, polite encoding announcements, and reduced-motion handling. |
| Privacy/offline | All parsing, hashing, searching, rendering, bookmarks, and progress storage happen locally. The application has no runtime dependency, backend, analytics, or book upload. |

### Usage

1. Download `reader.html`.
2. Open it in a current Chrome, Edge, Firefox, or Safari browser.
3. Select **Open** and choose a `.txt` novel.
4. If text is garbled, open Settings (⚙) and select the correct encoding.

Progress and preferences are stored in the current browser. Clearing site data, using private browsing, changing browser/origin, or changing devices may remove or isolate that data. Speech voices and background TTS behavior depend on the browser and operating system.

Search intentionally lists at most 100 results. Manual bookmarks currently provide one saved position per book. The brightness slider changes reading-content opacity; it cannot control the device's physical screen brightness. Cloud synchronization, account-based libraries, annotations, chapter detection, and EPUB/PDF support are not currently implemented.

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

### 完整功能一覽

| 類別 | 現有完整功能 |
| --- | --- |
| 本機開檔 | 使用瀏覽器 File API 開啟 `.txt`、顯示檔名、統一 CRLF／CR 換行並將 Tab 展開為四個空格；閱讀區會顯示載入中、空檔案與讀取失敗狀態。 |
| 文字解碼 | 以 `ArrayBuffer` 保留原始位元組；預設 UTF-8，並可直接切換 Big5、GB18030、UTF-16 LE、UTF-16 BE，不必重新選檔。 |
| 自適應分頁 | 以 DOM 實際高度及二分搜尋計算當頁容量，不使用固定字數；換頁時優先尋找附近換行或中文句末標點。 |
| 閱讀模式 | 支援自適應分頁及連續垂直捲動；視窗尺寸改變時會重新排版目前內容。 |
| 翻頁與跳轉 | 支援上一頁／下一頁按鈕、左右方向鍵、空白鍵、百分比跳轉、閱讀區左右點擊及水平滑動；手動操作會停止朗讀。 |
| 自動進度 | 每次顯示頁面後保存目前字元位置，再次開啟同一本書時恢復；無效、過期或超出全文的索引會被限制在合法範圍。 |
| 書籍識別 | Web Crypto 可用時以檔案位元組的 SHA-256 識別；否則以檔名、大小及修改時間組合識別；仍可讀取舊版以檔名保存的自動進度。 |
| 手動書籤 | 每本識別後的書可保存一個手動書籤；保存時顯示百分比，讀取前要求確認，並相容舊版檔名書籤。 |
| 全文搜尋 | 搜尋完整解碼文字，列出最前面 100 筆結果及前後文，以安全文字節點高亮關鍵字，點選結果即可跳轉。 |
| 語音朗讀 | 優先選擇 `zh-TW`，其次其他中文或系統第一個語音；朗讀目前頁、讀完自動翻頁，支援開始／停止及語速調整。 |
| 顯示設定 | 字級 14–50 px、閱讀內容亮度／透明度 20–100%、行距 1.4–2.0，以及高對比、深色、紙張色、亮色四種主題。 |
| 響應式介面 | 手機工具列縮排、行動版全寬搜尋面板、動態 viewport、安全區域 padding，以及點擊閱讀區中央隱藏／顯示工具列。 |
| 無障礙 | 文件語言為繁體中文、語意化 toolbar/main、主要圖示控制項名稱、清楚鍵盤焦點、編碼切換狀態播報及 reduced-motion。 |
| 隱私與離線 | 解碼、雜湊、搜尋、排版、書籤及進度全部在本機完成；沒有執行期外部依賴、後端、分析追蹤或小說上傳。 |

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

### 現有限制

- 全文搜尋最多列出前 100 筆結果。
- 每本書目前只有一個手動書籤，尚未提供多書籤或註記。
- 「亮度」滑桿調整的是閱讀內容透明度，無法控制裝置的實體螢幕亮度。
- 尚未實作雲端同步、帳號書庫、章節自動辨識、EPUB 或 PDF。
- 系統可用語音、背景 TTS、File API、Web Crypto 及本機儲存行為可能因瀏覽器而異。

### 開發與測試

本專案不需建置。修改後執行：

```bash
node --test tests/reader-state.test.js
```

完整改善計畫、階段與驗收條件請參閱 [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md)。
