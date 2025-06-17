import { expect } from 'chai'
import { Contract, ContractFactory } from 'ethers'
import { ethers } from 'hardhat'

describe("TickerFactory", () => {
    let addr1, contract, owner;
    beforeEach(async () => {
        [owner, addr1] = await ethers.getSigners();
        const TicketFactory: ContractFactory = await ethers.getContractFactory("TicketFactory");

        contract = await TicketFactory.deploy()

        await contract.waitForDeployment()
    })

    it("Should create a Event", async () => {

        const tx = await contract.connect(addr1).createEvent("Event 1", "EVE");
        const receipt = await tx.wait()
        const iface = new ethers.Interface([
            "event EventCreated(address indexed eventAddress)"
        ]);

        let found = '';
        for (const log of receipt.logs) {
            try {
                const parsed = iface.parseLog(log);
                if (parsed.name === "EventCreated") {
                    const deployed = parsed.args[0]; // or parsed.args.eventAddress
                    console.log("✅ EventTicket deployed at:", deployed);
                    found = deployed;
                    expect(deployed).to.properAddress;
                }
            } catch {
                // not our event, skip
            }
        }


       

        const event = await contract.allEvents(0);
        expect(event).to.equal(found);
    })
})