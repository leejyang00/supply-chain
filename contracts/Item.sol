pragma solidity ^0.6.0;

import "./ItemManager.sol";

contract Item {

    uint public paidInWei;
    uint public priceInWei;
    uint public index;

    ItemManager parentContract;

    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) public {
        parentContract = _parentContract;
        priceInWei = _priceInWei;
        index = _index;
    }

    receive() external payable {
        require(msg.value == priceInWei, "Only accept full payment");
        require(paidInWei == 0, "Item has been paid!");
        paidInWei += msg.value;
        (bool success, ) = address(parentContract).call.value(msg.value)(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "Unablet to make delivery");
    }

    fallback() external {}

}