pragma solidity ^0.6.0;

contract Ownable {

    address public _owner;

    constructor() public {
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(isOwner(), "You are not the owner");
        _;
    }

    function isOwner() public view returns(bool) {
        return msg.sender == _owner;
    }

}