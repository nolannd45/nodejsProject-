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

  // Vérifie si la page d'accueil se charge correctement
  it("devrait charger la page d'accueil", async function () {
    await driver.get("http://localhost:3000");
    const pageTitle = await driver.getTitle();
    // Utilisez expect() ici
    (await import("chai")).expect(pageTitle).to.equal("Hotel-react");
  });

  // Teste la connexion avec succès
  it("devrait se connecter avec succès", async function () {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("pseudo")).sendKeys("nolannd");
    await driver.findElement(By.id("password")).sendKeys("nolannd");
    await driver.findElement(By.id("connexion")).click();
  });
  // Teste la connexion avec succès
  it("devrait selectionner et reserver un hôtel", async function () {
    await driver.get("http://localhost:3000");
    const listHotels = await driver.findElements(By.tagName('a'));
    await listHotels[0].click();
    await driver.findElement(By.id('reserver')).click();
    await driver.findElement(By.id("startDate")).sendKeys("2024-03-27T00:00:00.000+00:00");
    await driver.findElement(By.id("EndDate")).sendKeys("2024-03-29T00:00:00.000+00:00");
    await driver.findElement(By.id("valider")).click();

  });
  // Teste la connexion avec succès
  // it('devrait Reserver', async function() {
  //     await driver.get('http://localhost:3000/hotels/65e4cbd12d34b38342b18af9');
  //     await driver.findElement(By.id('reserver')).click();
  // });
});
