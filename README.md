# QRCode_Generator
## 使用語言
1. HTML
2. CSS
3. JavaScript、JQuery
## 功能說明
### 1. 車種
1. 輸入車種年度、車種名稱、最高速限、客戶SKU資料
2. 點擊Encode
3. BarCode區個別呈現四項資料對應的BarCode
4. QRCode區呈現將四項資料以分號組合起來的QRCode
5. 點擊Download按鈕可下載產生的BarCode或QRCode
6. 點擊Print按鈕可列印產生的BarCode或QRCode
7. 點擊Clear按鈕可清除車種年度、車種名稱、最高速限、客戶SKU資料欄位、BarCode區塊及QRCode區塊所有內容
### 2. 車架
1. 輸入車架資料
2. 點擊Encode
3. BarCode區呈現對應的BarCode
4. QRCode區呈現對應的QRCode
5. 點擊Download按鈕可下載產生的BarCode或QRCode
6. 點擊Print按鈕可列印產生的BarCode或QRCode
7. 點擊Clear按鈕可清除車架號碼資料欄位、BarCode區塊及QRCode區塊所有內容
## 核心
| Option          | Description                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| BarCode產生器   | 引用[JsBarcode.all.min.js](https://lindell.me/JsBarcode/?fbclid=IwAR1kMF1Wqud9QGGE2Mb9A-bWJDncUDqy3mBBd4Q05mEXSFE1e7LIDXrRJCs#download) |
| QRCode產生器    | 引用[jquery-qrcode-0.17.0.min.js](https://mnya.tw/cc/word/1467.html)                                                                    |
| BarCode圖檔轉換 | svgToPng(svgUrl, CodeDownload)                                                                                                          |
## 連結

1. [CodePen](https://codepen.io/Clare46/pen/XWjRVpB)
2. [GitHub Pages](https://hungxingyu.github.io/02.QRCode_Generator/)

