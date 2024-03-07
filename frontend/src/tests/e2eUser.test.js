// Importer les dépendances
const { Builder, By, until } = require('selenium-webdriver');

describe('Test E2E de l\'application', function() {
    this.timeout(10000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });
    
    // Vérifie si la page d'accueil se charge correctement
    it('devrait charger la page d\'accueil', async function() {
        await driver.get('http://localhost:3000'); // Modifier l'URL en fonction de votre application
        const pageTitle = await driver.getTitle();
        // Utilisez expect() ici
        (await import('chai')).expect(pageTitle).to.equal('Hotel-react');
    });

    // Teste la connexion avec succès
    it('devrait se connecter avec succès', async function() {
        await driver.get('http://localhost:3000/login'); // Modifier l'URL en fonction de votre application
        await driver.findElement(By.id('pseudo')).sendKeys('nolannd');
        await driver.findElement(By.id('password')).sendKeys('nolannd');
        await driver.findElement(By.id('connexion')).click();
    });
});
