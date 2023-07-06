// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;

contract CoffeeMachineErrorChecker {
    uint public capacity = 0;

    function testRequire(uint _i) public {
        capacity = capacity + _i;
        require(capacity < 200, "Oh no, you put in too much coffee!");
    }

    function testRevert(uint _i) public {
        capacity = capacity + _i;
        if (capacity > 200) {
            revert("Oh no, you put in too much coffee!");
        }
    }

    function testAssert() public view {
        assert(capacity <= 200);
    }
}
