const driver = require("./driver")();
const { describe, it, before, after } = require("mocha");
const expect = require("chai").expect;

function getItemProperty(query, prop) {
  return `return window.getComputedStyle(document.querySelector("${query}")).getPropertyValue("${prop}");`;
}

describe("Dark mode should work", () => {
  before(async () => {
    await driver.get("https://suisei.moe");
  });

  it("should have light preference value by default", async () => {
    const x = await driver.executeScript(
      getItemProperty("#page", "--theme-preference")
    );
    expect(x).to.equal('"light"');
  });

  it("should have .themeSystem by default", async () => {
    const element = await driver.findElement({ id: "page" });
    const attrValue = await element.getAttribute("class");
    expect(attrValue).to.include("themeSystem");
  });

  it("should be able to toggle to and from dark mode", async () => {
    const element = await driver.findElement({ id: "page" });
    const darkModeToggle = await driver.findElement({
      id: "toggleEnforceDarkMode",
    });
    await darkModeToggle.click();
    let attrValue = await element.getAttribute("class");
    expect(attrValue).to.include("themeDark");
    await darkModeToggle.click();
    attrValue = await element.getAttribute("class");
    expect(attrValue).not.to.include("themeDark");
  });

  after(() => {
    driver.quit();
  });
});
