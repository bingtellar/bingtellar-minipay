// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract Remittance {
    address public owner;
    IERC20 public cUSD;
    struct Transaction {
        uint256 amount;
        uint256 fee;
        bool isProcessed;
    }
    mapping(bytes32 => Transaction) public transactions;
    event TransferRequested(address indexed sender, bytes32 indexed transactionId, uint256 amount);
    event TransferProcessed(address indexed recipient, bytes32 indexed transactionId, uint256 amount);
    constructor(address _cUSDAddress) {
        owner = msg.sender;
        cUSD = IERC20(_cUSDAddress);
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }
    function requestTransfer(address _recipient, uint256 _amount, uint256 _fee) external {
        require(_amount > 0, "Amount must be greater than zero.");
        require(_fee >= 0, "Fee must be non-negative.");
        bytes32 transactionId = keccak256(abi.encodePacked(msg.sender, _recipient, _amount, _fee));
        require(!transactions[transactionId].isProcessed, "Transaction already processed.");
        transactions[transactionId] = Transaction(_amount, _fee, false);
        cUSD.transferFrom(msg.sender, address(this), _amount + _fee);
        emit TransferRequested(msg.sender, transactionId, _amount);
    }
    function processTransfer(address _recipient, bytes32 _transactionId) external onlyOwner {
        require(!transactions[_transactionId].isProcessed, "Transaction already processed.");
        Transaction storage transaction = transactions[_transactionId];
        cUSD.transfer(_recipient, transaction.amount);
        cUSD.transfer(owner, transaction.fee);
        transaction.isProcessed = true;
        emit TransferProcessed(_recipient, _transactionId, transaction.amount);
    }
}