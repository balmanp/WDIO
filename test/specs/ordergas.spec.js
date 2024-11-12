const readExcelData = require('../specs/utils/readExcel.js');

describe("NIK KTP Tests", () => {
  let data;

  before(async () => {
    const filePath = './data/nik.xlsx';
    const sheetName = 'Sheet1';
    data = readExcelData(filePath, sheetName);

    await browser.maximizeWindow();
    await browser.url("https://tiktok-app-one.vercel.app/bot-nik");
    await expect(browser).toHaveUrl("https://tiktok-app-one.vercel.app/bot-nik");
  });

  it("tests NIK KTP Submission", async () => {
    for (const row of data) {
      const nikInput = await browser.$("aria/Masukkan 16 digit NIK KTP Pelanggan");
      const cekButton = await browser.$("aria/Cek");
      const processButton = await browser.$("aria/Proses Transaksi");

      // Input NIK
      await nikInput.setValue(row.nik);
      await cekButton.click();
      await browser.waitUntil(async () => {
        return (await browser.getUrl()) === "https://tiktok-app-one.vercel.app/bot-nik/add-qty";
      });

      // Confirm URL
      await cekButton.click();
      await browser.waitUntil(async () => {
        return (await browser.getUrl()) === "https://tiktok-app-one.vercel.app/bot-nik/summary";
      });

      // Process Transaction
      await processButton.click();
      await browser.waitUntil(async () => {
        return (await browser.getUrl()) === "https://tiktok-app-one.vercel.app/bot-nik/trx-slip";
      });

      // Return to initial page
      await browser.url("https://tiktok-app-one.vercel.app/bot-nik"); 
    }
  });
});
