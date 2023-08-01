// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    using Counters for Counters.Counter;
    Counters.Counter private transactionIds;

    event Deposit(address indexed account, uint256 _amount, uint256 transactionId);
    event Withdraw(address indexed account, uint256 _amount, uint256 transactionId);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        // emit Deposit(_amount);
        emit Deposit(msg.sender, _amount, transactionIds.current());
        transactionIds.increment();
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        // emit Withdraw(_withdrawAmount);
        emit Withdraw(msg.sender, _withdrawAmount, transactionIds.current());
        transactionIds.increment();
    }
}
