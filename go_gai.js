
const puppeteer = require('puppeteer-core');
const clipboardy = require('node-clipboardy');

(async () => {
  // Microsoft Edgeのパスを指定します
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: false, // ヘッドレスモードを無効にします
    args: ['--start-maximized'] // ウィンドウを最大化する
  });

  const page = await browser.newPage();
  await page.setViewport({width: 1880, height: 1024});
  await page.goto('https://melgitgaipreview-cd01001ze.megcloud.melco.co.jp/');
 

  // クリップボードのテキストを取得
  console.log(clipboardy);
  const clipboardText = clipboardy.readSync();
  console.log("aaa")

  let r
  r = await page.waitForSelector('span'); // span 要素が存在することを確認
  r = await page.waitForSelector('::-p-xpath(//span[text()="新しい会話を開始"])'); // span 要素が存在することを確認
  await r.click();
  console.log("xpath", r);



  //r = await page.waitForSelector('input[type="radio"][value="一般知識モード"]'); // span 要素が存在することを確認
  r = await page.waitForSelector('::-p-xpath(//label[text()="一般知識モード"])'); // span 要素が存在することを確認
  //await r.click();
  await page.click('::-p-xpath(//label[text()="一般知識モード"])');

let elementInfo = await page.evaluate(el => {
  return {
    tagName: el.tagName,
    textContent: el.textContent,
    innerHTML: el.innerHTML,
    outerHTML: el.outerHTML
  };
}, r);
console.log("info", elementInfo);


  // テキストエリアにクリップボードのテキストを挿入
  await page.waitForSelector('textarea'); // テキストエリアのセレクタを指定
  await page.type('textarea', "以下のメールの返事を書いてください。\n\n####\n\n" + clipboardText);


  // ブラウザを閉じる
  // await browser.close();
})();
