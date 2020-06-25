const driver = require("./driver")();
const { describe, it, beforeEach, after } = require("mocha");
const expect = require("chai").expect;

describe("Board should work", () => {
  beforeEach(async () => {
    await driver.get("https://suisei.moe?lang=en");
  });

  it("should have right text before board display", async () => {
    const element = await driver.findElement({ id: "switchBtn" });
    let elementText = await element.getText();
    expect(elementText).to.equal("Music board");
    await element.click();
    elementText = await element.getText();
    expect(elementText).to.equal("Back");
  });

  it("should display small buttons at board display", async () => {
    const element = await driver.findElement({ id: "switchBtn" });
    let normalBtnElements = await driver.findElements({
      className: "normalBtn",
    });
    expect(normalBtnElements.length).to.equal(0);
    await element.click();
    normalBtnElements = await driver.findElements({
      className: "normalBtn",
    });
    expect(normalBtnElements.length).to.greaterThan(0);
    await driver.sleep(1500);
    expect(await normalBtnElements[0].isDisplayed()).to.be.true;
    await element.click();
    await driver.sleep(1500);
    normalBtnElements = await driver.findElements({
      className: "normalBtn",
    });
    expect(normalBtnElements.length).to.equal(0);
  });

  after(() => {
    driver.quit();
  });
});
