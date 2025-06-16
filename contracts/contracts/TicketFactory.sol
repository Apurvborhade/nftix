// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;
import "./EventTicket.sol";

contract TicketFactory {
    address[] public allEvents;
    mapping(address => address[]) organizerToEvents;

    function createEvent(
        string memory _eventName,
        string memory _symbol
    ) external {
        EventTicket newEvent = new EventTicket(_eventName, _symbol, msg.sender);

        allEvents.push(address(newEvent));

        organizerToEvents[msg.sender].push(address(newEvent));
    }

    function getOrganizerEvents(
        address organizer
    ) external view returns (address[] memory) {
        return organizerToEvents[organizer];
    }

    function getAllEvents() external view returns (address[] memory) {
        return allEvents;
    }
}
