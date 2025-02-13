
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
  await page.setViewport(null);
  await page.goto('https://melgitgaipreview-cd01001ze.megcloud.melco.co.jp/');

  // クリップボードのテキストを取得
  console.log(clipboardy);
  const clipboardText = clipboardy.readSync();
  console.log("got clipboard")

  let r
  r = await page.waitForSelector('span'); // span 要素が存在することを確認
  r = await page.waitForSelector('::-p-xpath(//span[text()="新しい会話を開始"])'); // span 要素が存在することを確認
  await r.click();
  console.log("clicked xpath", r);

  await page.waitForNetworkIdle();
  console.log("waited");

  //r = await page.waitForSelector('input[type="radio"][value="一般知識モード"]'); // span 要素が存在することを確認
  r = await page.waitForSelector('::-p-xpath(//label[text()="一般知識モード"])'); // span 要素が存在することを確認
  //await r.click();
  await page.click('::-p-xpath(//label[text()="一般知識モード"])');
  console.log("clicked xpath", r);

  // for debug
  let elementInfo = await page.evaluate(el => {
    return {
      tagName: el.tagName,
      textContent: el.textContent,
      innerHTML: el.innerHTML,
      outerHTML: el.outerHTML
    };
  }, r);
  console.log("info", elementInfo);

  await page.waitForNetworkIdle();

  // テキストエリアにクリップボードのテキストを挿入
  await page.waitForSelector('textarea#textareaMessage'); // テキストエリアのセレクタを指定
  const user_text = "以下のメールの返事を書いてください。\n\n####\n\n" + clipboardText;
  await page.evaluate((selector, text) => {
    document.querySelector(selector).value = text;
    console.log("W", selector, text);
  }, 'textarea#textareaMessage', user_text);
  console.log("set user prompt");

  await page.waitForNetworkIdle();

  // テキストエリア
  const textareaSelector = 'textarea#textareaSystemPrompt';
  // textareaの値をクリア
  await page.evaluate((selector) => {
    document.querySelector(selector).value = '';
  }, textareaSelector);
  page.type(textareaSelector, "あなたはメールの返事を書く専門家です。社内メールの文体で書いてください。");
  console.log("set system prompt");

  // ブラウザを閉じる
  // await browser.close();
})();
