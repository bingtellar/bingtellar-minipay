// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./openzeppelin-contracts/contracts/token/ERC20/IERC20.sol"; // Import the ERC-20 interface

contract BingRemit {

    address public owner;
    IERC20 public token; // Assumes an ERC-20 token contract is deployed separately

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function sendTokens(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Invalid amount");

        token.transfer(to, amount);
    }

    function approve(address spender, uint256 amount) external onlyOwner {
        require(spender != address(0), "Invalid spender address");
        require(amount > 0, "Invalid amount");

        token.approve(spender, amount);
    }
}
