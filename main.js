//#region 選擇DOM節點
const btnEncode = document.querySelector('#Data-input button')
const btnBarCodeDownload = document.querySelector('#BarCodePanel .btn-Download')
const btnBarCodePrint = document.querySelector('#BarCodePanel .btn-Print')
const btnBarCodeClear = document.querySelector('#BarCodePanel .btn-Clear')
const btnQRCodeDownload = document.querySelector('#QRCodePanel .btn-Download')
const btnQRCodePrint = document.querySelector('#QRCodePanel .btn-Print')
const btnQRCodeClear = document.querySelector('#QRCodePanel .btn-Clear')

const btnEncode2 = document.querySelector('#Data-input2 button')
const btnBarCodeDownload2 = document.querySelector('#BarCodePanel2 .btn-Download')
const btnBarCodePrint2 = document.querySelector('#BarCodePanel2 .btn-Print')
const btnBarCodeClear2 = document.querySelector('#BarCodePanel2 .btn-Clear')
const btnQRCodeDownload2 = document.querySelector('#QRCodePanel2 .btn-Download')
const btnQRCodePrint2 = document.querySelector('#QRCodePanel2 .btn-Print')
const btnQRCodeClear2 = document.querySelector('#QRCodePanel2 .btn-Clear')

let QRCodeinput , QRCodeinput2
let input1
let input2
let input3
let input4
let target
//#endregion

//#region 設置監聽器
btnEncode.addEventListener('click', Encode)
btnEncode2.addEventListener('click', Encode)

btnBarCodeDownload.addEventListener('click', BarCodeDownload)
btnBarCodePrint.addEventListener('click', BarCodePrint)
btnBarCodeClear.addEventListener('click', Clear)
btnBarCodeDownload2.addEventListener('click', BarCodeDownload)
btnBarCodePrint2.addEventListener('click', BarCodePrint)
btnBarCodeClear2.addEventListener('click', Clear)

btnQRCodeDownload.addEventListener('click', QRCodeDownload)
btnQRCodePrint.addEventListener('click', QRCodePrint)
btnQRCodeClear.addEventListener('click', Clear)
btnQRCodeDownload2.addEventListener('click', QRCodeDownload)
btnQRCodePrint2.addEventListener('click', QRCodePrint)
btnQRCodeClear2.addEventListener('click', Clear)
//#endregion

//#region function

/**【產生BarCode、QRCode】
 * 1. 清空舊的BarCode、QRCode
 * 2. 取得輸入的資料
 * 3. 產生新的BarCode
 * 4. 產生新的QRCode
 * @param {*} event  
 */
function Encode(event) {
    target = event.target
    let panelId = target.parentElement.id 

    if (panelId === "Data-input") {
        //1. 清空舊的BarCode、QRCode
        document.querySelectorAll('#BarCodes div svg').forEach(svg => {
            svg.innerHTML = null
        })
        document.querySelector('#jquery-qrcode-image').innerHTML = null

        //2. 取得輸入的資料
        input1 = document.querySelectorAll('#Data-input table tbody tr td input')[0].value
        input2 = document.querySelectorAll('#Data-input table tbody tr td input')[1].value
        input3 = document.querySelectorAll('#Data-input table tbody tr td input')[2].value
        input4 = document.querySelectorAll('#Data-input table tbody tr td input')[3].value
        QRCodeinput = input1 + ';' + input2 + ';' + input3 + ';' + input4

        //3. 產生新的BarCode
        document.querySelectorAll('#BarCodes div svg').forEach(svg => {
            let id = '#' + svg.id
            if (id.indexOf('1') > -1) {
                BarCodeGenerator(id, input1)
            } else if (id.indexOf('2') > -1) {
                BarCodeGenerator(id, input2)
            } else if (id.indexOf('3') > -1) {
                BarCodeGenerator(id, input3)
            } else {
                BarCodeGenerator(id, input4)
            }
        })

        //4. 產生新的QRCode
        $("#jquery-qrcode-image").qrcode({
            render: 'image',
            size: 250,
            ecLevel: 'H',
            text: QRCodeinput
        });
    }
    else {
        //1. 清空舊的BarCode、QRCode
        document.querySelectorAll('#BarCodes2 div svg').forEach(svg => {
            svg.innerHTML = null
        })
        document.querySelector('#jquery-qrcode-image2').innerHTML = null
        //2. 取得輸入的資料
        QRCodeinput2 = document.querySelectorAll('#Data-input2 table tbody tr td input')[0].value
         //3. 產生新的BarCode
        BarCodeGenerator("#barcode", QRCodeinput2)
        //4. 產生新的QRCode
        $("#jquery-qrcode-image2").qrcode({
            render: 'image',
            size: 250,
            ecLevel: 'H',
            text: QRCodeinput2
        });
    }
}

/**【產生新的BarCode】
 * @param {*} id  //顯示BarCode所在的id
 * @param {*} text //壓縮在BarCode的文字
 */
function BarCodeGenerator(id, text) {
    JsBarcode(id, text, {
        format: "CODE128", //BarCode壓縮格式
        lineColor: "#000", //BarCode線條顏色
        margin: 5,
        width: 1, //BarCode線條寬度
        height: 30,
        displayValue: true, //BarCode顯示內含文字
        fontSize: 15,
        text: text //BarCode顯示內含文字
    });
}

/**【下載BarCode】
 * 1. 找出svg元素、長寬
 * 2. 定義svgUrl 為 data:URL + 將svgXml編碼為base-64編碼的字串
 * 3. 呼叫svgToPng(svgUrl , 再呼叫CodeDownload('下載檔名' ,'下載檔的url' )下載BarCode)>此為回撥函式(Callback)
 */
function BarCodeDownload() {
    target = event.target  
    Array.from(target.parentElement.previousElementSibling.children).forEach(div => {
        let svg = div.children[0]
        let svgWidth = svg.clientWidth
        let svgHeight = svg.clientHeight

        let svgXml = div.innerHTML
        let svgUrl = 'data:image/svg+xml;base64,' + window.btoa(svgXml)

        svgToPng(svgUrl, CodeDownload)
        /** svgToPng
         * 1. 宣告pngURL
         * 2. 宣告image
         * 3. 指定image.src為編碼後的svgUrl
         * 4. 建立image的onload(圖片加載完成後立即執行)事件
         *      4.1 建立canvas(一個固定大小的繪圖畫布)
         *      4.2 定義canvas的長、寬
         *      4.3 呼叫canvas的getContext()方法，指定canvas的渲染環境類型(2d為2d繪圖)，再呼叫drawImage()方法將image繪製canvas
         *      4.4 利用canvas中toDataURL()將圖片轉為png類型的dataURL(base64)
         *      4.5 再呼叫CodeDownload('下載檔名' ,'下載檔的url' )下載BarCode
         * @param {*} svgUrl 已編碼為base64的svgUrl
         * @param {*} callback 回撥函式，將變數('BarCode',dataURL)傳至CodeDownload下載BarCode
         */
        function svgToPng(svgUrl, callback) {
            let pngURL = ''
            let image = new Image()
            image.src = svgUrl
            image.onload = function () {
                let canvas = document.createElement('canvas')
                canvas.width = svgWidth
                canvas.height = svgHeight
                canvas.getContext("2d").drawImage(image, 0, 0, svgWidth, svgHeight)
                pngURL = canvas.toDataURL('image/png')
                callback('BarCode', pngURL);
            }
        }
    })
}

/**【下載QRCode】
 * 1. 通過選擇器獲取img元素
 *     將圖片的src屬性作為URL地址
 * 2. 呼叫CodeDownload('下載檔名' , '下載檔的url')下載QRCode
 */
function QRCodeDownload() {
    target = event.target
    let img = target.parentElement.previousElementSibling.children[0].children[0]
    let url = img.src
    let panelId = target.parentElement.parentElement.id
    if (panelId === "QRCodePanel") {
        CodeDownload(QRCodeinput.replace(".", ""), url)
    }
    else {
        CodeDownload(QRCodeinput2, url)
    }
    
}

/**【下載BarCode、QRCode】
 * 1. 建立超連結標籤<a>
 * 2. 定義<a>的下載檔名
 *                      連結地址
 * 3.執行click事件 
 * @param {*} name 下載檔名
 * @param {*} url  連結地址
 */
function CodeDownload(name, url) {
    let a = document.createElement('a')
    a.download = name
    a.href = url
    a.click()
}

/**【列印BarCode】
 * 1.通過選擇器獲取div元素
 * 2.設定要列印的div的內容
 * 3.呼叫CodePrint(BarCode的HTML)列印BarCode
 */
function BarCodePrint() {
    target = event.target
    let printdiv = target.parentElement.previousElementSibling
    let docStr = printdiv.innerHTML
    CodePrint(docStr)
}


/**【列印QRCode】
 * 1.通過選擇器獲取div元素
 * 2.設定要列印的div的內容
 * 3.呼叫CodePrint(QRCode的HTML)列印QRCode
 * @param {*} event 
 */
function QRCodePrint() {
    target = event.target
    let printdiv = target.parentElement.previousElementSibling.children[0]
    let docStr = printdiv.innerHTML
    CodePrint(docStr)
}

/**【開新視窗列印特定區域】
 * 1. 開啟一個新視窗
 * 2. 列印內容寫入newWindow文件
 * 3. 關閉文件
 * 4. 呼叫印表機
 * 5. 關閉newWindow頁面
 * @param {*} CodeHTML 
 */
function CodePrint(CodeHTML) {
    let newWindow = window.open("列印視窗", "_blank")
    newWindow.document.write(CodeHTML)
    newWindow.document.close()
    newWindow.print()
    newWindow.close()
}

/**【清空全部輸入欄位、BarCodes、QRCode】
 */
function Clear() {
    target = event.target
    let panelId = target.parentElement.parentElement.id

    if (panelId.indexOf("2") > -1) {
        document.querySelectorAll('#Data-input2 table tbody tr td input').forEach(input => {
            input.value = null
        })
        document.querySelectorAll('#BarCodes2 div svg').forEach(svg => {
            svg.innerHTML = null
        })
        document.querySelector('#jquery-qrcode-image2').innerHTML = null
    }
    else {
        document.querySelectorAll('#Data-input table tbody tr td input').forEach(input => {
            input.value = null
        })
        document.querySelectorAll('#BarCodes div svg').forEach(svg => {
            svg.innerHTML = null
        })
        document.querySelector('#jquery-qrcode-image').innerHTML = null
    }
}
//#endregion