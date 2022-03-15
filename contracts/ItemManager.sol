pragma solidity ^0.6.0;

import "./Item.sol";
import "./Ownable.sol";

contract ItemManager is Ownable {

    enum SupplyChainStep{Created, Paid, Delivered}
    event SupplyChainEvent(uint _itemIndex, uint _step, address _itemAddress);

    struct S_Item {
        Item _item;
        string _identifier;
        ItemManager.SupplyChainStep _step;
    }

    mapping(uint => S_Item) public items;
    uint public itemIndex;

    function createItem(string memory _identifier, uint _priceItem) public onlyOwner {
        Item item = new Item(this, _priceItem, itemIndex);
        items[itemIndex]._item = item;
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._step = SupplyChainStep.Created;

        emit SupplyChainEvent(itemIndex, uint(items[itemIndex]._step), address(item));
        itemIndex++;
    }

    function triggerPayment(uint _itemIndex) public payable {
        Item item = items[_itemIndex]._item;
        require(address(item) == msg.sender, "Only items are allowed to update themselves");
        require(item.priceInWei() == msg.value, "Not fully paid");
        require(items[_itemIndex]._step == SupplyChainStep.Created, "Item further down the supply chain");

        items[_itemIndex]._step = SupplyChainStep.Paid;
        emit SupplyChainEvent(_itemIndex, uint(items[_itemIndex]._step), address(items[_itemIndex]._item));
    }

    function triggerDelivery(uint _itemIndex) public onlyOwner {
        require(items[_itemIndex]._step == SupplyChainStep.Paid, "Item further down the supply chain");

        items[_itemIndex]._step = SupplyChainStep.Delivered;
        emit SupplyChainEvent(_itemIndex, uint(items[_itemIndex]._step), address(items[_itemIndex]._item));
    }

}