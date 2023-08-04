// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    constructor() ERC20("Degen", "DGN") {
        storeItems[0] = KawaiiItem(100, "Fluffy Bunny", "A cute and fluffy bunny plushie");
        storeItems[1] = KawaiiItem(200, "Sparkling Star Wand", "A magical wand that sparkles like the night sky");
        storeItems[2] = KawaiiItem(300, "Diamond Tiara", "A glittery princess tiara");
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
    }
    
    struct KawaiiItem {
        uint256 price;
        string name;
        string description;
    }
    mapping(uint256 => KawaiiItem) public storeItems;
    
    struct InventoryItem {
        uint256 itemId;
    }
    mapping(address => InventoryItem[]) public playerInventory;

    function redeem(uint256 itemId) public {
        require(storeItems[itemId].price > 0, "Item not available");
        require(balanceOf(msg.sender) >= storeItems[itemId].price, "Insufficient balance");
        
        _burn(msg.sender, storeItems[itemId].price);

        playerInventory[msg.sender].push(InventoryItem(itemId));
    }
}