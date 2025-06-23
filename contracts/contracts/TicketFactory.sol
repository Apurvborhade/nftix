// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;
import "./EventTicket.sol";

contract TicketFactory {
    address[] public allEvents;
    mapping(address => address[]) organizerToEvents;

    event EventCreated(address indexed eventAddress);
    function createEvent(
        string memory _eventName,
        string memory _symbol,
        uint _mintPrice
    ) external {
        EventTicket newEvent = new EventTicket(
            _eventName,
            _symbol,
            _mintPrice,
            msg.sender
        );

        allEvents.push(address(newEvent));

        organizerToEvents[msg.sender].push(address(newEvent));
        emit EventCreated(address(newEvent));
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
