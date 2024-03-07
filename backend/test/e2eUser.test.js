// e2e.test.js

// Importer les dépendances
import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';



describe('Test E2E de l\'application', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });
//on verif si la page est la bonne 
    it('devrait charger la page d\'accueil', async function() {
        await driver.get('http://localhost:3000'); // Modifier l'URL en fonction de votre application
        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.equal('Hotel-react');
    });
//on test les inputs
    it('devrait se connecter avec succès', async function() {
        await driver.get('http://localhost:3000/login'); // Modifier l'URL en fonction de votre application
        await driver.findElement(By.id('pseudo')).sendKeys('nolannd');
        await driver.findElement(By.id('password')).sendKeys('nolannd');
        await driver.findElement(By.id('connexion')).click();
    });
});
