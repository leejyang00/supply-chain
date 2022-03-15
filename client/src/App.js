import React, { useEffect, useState } from "react";
import ItemManager from "./contracts/ItemManager.json";
import Item from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [account, setAccount] = useState();
  const [itemManager, setItemManager] = useState();
  const [cost, setCost] = useState(0);
  const [itemName, setItemName] = useState("");

  const loadWeb3Accounts = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  const loadWeb3Contracts = async (web3) => {
    const networkId = await web3.eth.net.getId();

    const itemManagerContract = new web3.eth.Contract(
      ItemManager.abi,
      ItemManager.networks[networkId].address
    );
    setItemManager(itemManagerContract);
    return itemManagerContract;
  };

  const listenToPaymentHandler = async (contract) => {
    contract.events.SupplyChainEvent().on("data", async(evt) => {
      if (evt.returnValues._step == 1) {
        let item = await contract.methods.item(evt.returnValues._itemIndex).call();
        console.log(item, "item");
        alert("Item " + item._identifier + " was paid, deliver it now!");
      }
      console.log(evt, "evt");
    })
  }

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Accounts(web3);
    const contract = await loadWeb3Contracts(web3);
    setLoaded(true);
    listenToPaymentHandler(contract);
  }, []);


  const submitHandler = async () => {
    console.log(itemName, cost, itemManager);
    const result = await itemManager.methods
      .createItem(itemName, cost)
      .send({ from: account });
    console.log(result);
    alert(
      "Send " +
        cost +
        " Wei to " +
        result.events.SupplyChainStep.returnValues._itemAddress
    );
  };

  if (!loaded) {
    return (
      <div class="d-flex justify-content-center align-items-center">
        Loading Web3, accounts, and contract...
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Supply Chain</h1>
        <h2>Add Items</h2>
        <div class="d-flex flex-column align-items-center">
          Cost:{" "}
          <input
            type="text"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          Item Name:{" "}
          <input
            type="text"
            name="item-name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <button
          type="button"
          class="btn btn-primary mt-5"
          onClick={submitHandler}
        >
          Create Item
        </button>
      </div>
    );
  }
};

export default App;
