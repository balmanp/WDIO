const readExcelData = require('./utils/readExcel.js')

describe("NIK KTP", () => {
  let data;

  before(async () => {
    
    const filePath = './data/nik.xlsx';
    const sheetName = 'Sheet1';
    data = readExcelData(filePath, sheetName);

    await browser.maximizeWindow();
    await browser.url("https://tiktok-app-one.vercel.app/bot-nik");
    await expect(browser).toHaveUrl("https://tiktok-app-one.vercel.app/bot-nik");
  });

  it("tests NIK KTP", async () => {
    for (const row of data) {
      await browser.$("aria/Masukkan 16 digit NIK KTP Pelanggan").click();
      await browser.$("aria/Masukkan 16 digit NIK KTP Pelanggan").setValue(row.nik);
      await browser.$("aria/Cek").click();
      await browser.$("aria/Masukkan 16 digit NIK KTP Pelanggan").doubleClick();
      await browser.pause(1000);
    }
  });
});
