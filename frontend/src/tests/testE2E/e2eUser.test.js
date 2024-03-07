// Importer les dépendances
const { Builder, By, until } = require("selenium-webdriver");

describe("Test E2E de l'application", function () {
  this.timeout(10000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  // Teste la connexion avec succès
  it("devrait se connecter avec succès", async function () {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("pseudo")).sendKeys("nolannd");
    await driver.findElement(By.id("password")).sendKeys("nolannd");
    await driver.findElement(By.id("connexion")).click();
    const listHotels = await driver.findElements(By.tagName('a'));
    await listHotels[0].click();
    await driver.get("http://localhost:3000/hotels/65e5041e3dbbdc5ea66a1237");
    await driver.findElement(By.xpath(`//*[@id="reserver"]`)).click();

    await sleep(2000);

    await driver.findElement(By.xpath(`//*[@id="startDate"]`)).sendKeys("2024-03-27T00:00:00.000+00:00");
    await driver.findElement(By.xpath(`//*[@id="EndDate"]`)).sendKeys("2024-03-29T00:00:00.000+00:00");
    await driver.findElement(By.xpath(`//*[@id="valider"]`)).click();
  });

  // Teste la reservation
  // it("devrait selectionner et reserver un hôtel", async function () {
  //   await driver.get("http://localhost:3000");
  //   c

  // });
});
