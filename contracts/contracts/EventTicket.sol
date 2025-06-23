// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract EventTicket is ERC721, Ownable {
    uint public maxSupply = 100;
    uint public currentSupply;
    uint public mintPrice = 0.01 ether;
    address public organizer;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        address initialOwner
    ) ERC721(_tokenName, _tokenSymbol) Ownable(initialOwner) {
        organizer = msg.sender;
    }

    event TicketMinted(address indexed recipient, uint tokenId);

    // Mint Ticket
    function mintTicket(address to) external payable onlyOwner {
        // Check for Supply
        require(currentSupply < maxSupply, "Maximum Supply Reached");

        // Check The Amount of ether sent
        require(msg.value == mintPrice, "Price of this ticket is 0.01 ETH");

        uint tokenId = currentSupply + 1;

        _safeMint(to, tokenId);

        // Emit Event
        emit TicketMinted(to, tokenId);
        currentSupply++;
    }

    // Withdraw funds
    function withDrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Get current supply
    function mintedTokens() public view returns (uint) {
        return currentSupply;
    }

    // Read Organizer
    function viewOrganizer() public view returns (address) {
        return organizer;
    }

    // Ticket Price
    function ticketPrice() public view returns (uint) {
        return mintPrice;
    }
}
