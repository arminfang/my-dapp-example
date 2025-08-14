// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract SimpleBank {
    mapping(address => uint256) public balances;
    address public owner;
    bool public isPaused;

    constructor() {
        owner = msg.sender;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Owner only");
        _;
    }

    modifier notPaused() {
        require(!isPaused, "function paused!");
        _;
    }

    event Deposited(address indexed from, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    function deposit() public payable notPaused {
        require(msg.value > 0, "Recharge amount must large than 0");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public notPaused {
        require(
            balances[msg.sender] >= amount,
            "You don't have enough assets!!"
        );
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdraw failed");
        emit Withdrawn(msg.sender, amount);
    }

    function getCurrentBalance(
        address _addr
    ) public view returns (uint256 amount) {
        return balances[_addr];
    }

    function getContractAmount() public view returns (uint256) {
        return address(this).balance;
    }

    function pause() public ownerOnly {
        isPaused = true;
    }

    function resume() public ownerOnly {
        isPaused = false;
    }

    receive() external payable {
        deposit();
    }

    fallback() external payable {
        deposit();
    }
}
