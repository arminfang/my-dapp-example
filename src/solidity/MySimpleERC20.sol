// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MySimpleERC20 is IERC20 {
    uint256 public override totalSupply;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        totalSupply = 1_000_000 * 10 ** 18;
        balanceOf[msg.sender] = totalSupply;
    }

    // 合约调用者向目标地址转账
    function transfer(
        address to,
        uint256 value
    ) public override returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance!");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    // 合约调用者向目标地址授权使用额度，授权额度未被消费前，合约调用者余额不变
    function approve(
        address spender,
        uint256 value
    ) public override returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        allowance[msg.sender][spender] += value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // 调用者消费自己的授权额度
    function transferFrom(
        address sender,
        address to,
        uint256 value
    ) public override returns (bool) {
        require(balanceOf[sender] >= value, "Insufficient balance");
        allowance[sender][msg.sender] -= value;
        balanceOf[sender] -= value;
        balanceOf[to] += value;
        emit Transfer(sender, to, value);
        return true;
    }
}
