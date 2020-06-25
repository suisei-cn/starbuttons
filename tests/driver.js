const webdriver = require("selenium-webdriver");
const getcmt = require("./getCommit");
const userName = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESSKEY;
const browserstackURL =
  "https://" +
  userName +
  ":" +
  accessKey +
  "@hub-cloud.browserstack.com/wd/hub";

// Input capabilities
const cap = require("./capabilities");
const capabilities = Object.assign(cap[2], {
  project: "Starbuttons",
  build: getcmt(),
});

console.info(`Testing for build ${getcmt()}`);

function getSeleniumDriver(type = process.env.E2E_SOURCE || "remote") {
  if (type === "remote") {
    return new webdriver.Builder()
      .usingServer(browserstackURL)
      .withCapabilities(capabilities)
      .build();
  }
  return new webdriver.Builder().forBrowser("chrome").build();
}

module.exports = getSeleniumDriver;
