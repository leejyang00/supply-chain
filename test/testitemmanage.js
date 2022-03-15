const { assert } = require("console");

var ItemManager = artifacts.require("./ItemManager.sol");

contract("ItemManager", (accounts) => {

  it("..should be able to add item", async () => {
    const itemManagerInstance = await ItemManager.deployed();
    const itemName = "Jian";
    const itemCost = 123;

    const result = await itemManagerInstance.createItem(itemName, itemCost, {
      from: accounts[0]
    });

    assert(result.logs[0].args._itemIndex, 0, "It's not the first item");

    const item = await itemManagerInstance.items(0);
    assert(item._identifier, itemName, "Does not have the same name");   
  });
});