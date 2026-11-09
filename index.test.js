require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

const BASE_URL = "http://localhost:3000";

async function setDelay(driver) {
  await driver.sleep(1000);
}

async function shouldOpenHomepage(driver) {
  await driver.get(BASE_URL);
  await driver.wait(until.titleIs("Home"), 5000);
  console.log("PASS: homepage title is Home");
  await setDelay(driver);
}

async function shouldOpenContactPage(driver) {
  await driver.get(`${BASE_URL}/contact`);
  await driver.wait(until.titleIs("Contact Us"), 5000);
  console.log("PASS: contact page title is Contact Us");
  await setDelay(driver);
}

async function shouldSignUpForMoreInfo(driver) {
  const email = "test@example.com";
  await driver.get(`${BASE_URL}/contact`);
  const input = await driver.wait(
    until.elementLocated(By.id("formInput")),
    5000,
  );
  await input.sendKeys(email);
  await setDelay(driver);
  await driver.findElement(By.id("formSubmit")).click();
  const message = await driver.wait(
    until.elementLocated(By.id("formMessage")),
    5000,
  );
  await setDelay(driver);
  const text = await message.getText();
  if (text !== `More info coming to ${email}`) {
    throw new Error(
      `Expected "More info coming to ${email}" but got "${text}"`,
    );
  }
  console.log("PASS: sign up message shows the email");
}

async function runTests() {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await shouldOpenHomepage(driver);
    await shouldOpenContactPage(driver);
    await shouldSignUpForMoreInfo(driver);
  } catch (error) {
    console.error("FAIL:", error.message);
    process.exitCode = 1;
  } finally {
    await driver.quit();
  }
}

runTests();
