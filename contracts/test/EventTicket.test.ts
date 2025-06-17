import { ethers } from "hardhat";
import { expect } from "chai";

describe("EventTicket", function () {
  let EventTicket: any;
  let ticket: any;
  let owner: any;
  let addr1: any;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();

    EventTicket = await ethers.getContractFactory("EventTicket");
    ticket = await EventTicket.deploy("TestEvent", "TST", owner.address);
    await ticket.waitForDeployment();
  });

  it("should deploy with correct values", async () => {
    expect(await ticket.name()).to.equal("TestEvent");
    expect(await ticket.symbol()).to.equal("TST");
    expect(await ticket.viewOrganizer()).to.equal(owner.address);
    expect(await ticket.ticketPrice()).to.equal(ethers.parseEther("0.01"));
  });

  it("should allow owner to mint a ticket with exact payment", async () => {
    const tx = await ticket.connect(owner).mintTicket(addr1.address, {
      value: ethers.parseEther("0.01"),
    });
    const receipt = await tx.wait();

    // Decode the TicketMinted event
    const iface = new ethers.Interface([
      "event TicketMinted(address indexed recipient, uint tokenId)"
    ]);

    const parsedLogs = receipt.logs
      .map((log) => {
        try {
          return iface.parseLog(log);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    const event = parsedLogs.find((e) => e?.name === "TicketMinted");

    expect(event).to.not.be.undefined;
    expect(event?.args.recipient).to.equal(addr1.address);
    expect(event?.args.tokenId).to.equal(1n); // BigInt in v6

    expect(await ticket.ownerOf(1)).to.equal(addr1.address);
    expect(await ticket.currentSupply()).to.equal(1);
  });

  it("should fail if not enough ETH is sent", async () => {
    await expect(
      ticket.connect(owner).mintTicket(addr1.address, {
        value: ethers.parseEther("0.005"),
      })
    ).to.be.revertedWith("Price of this ticket is 0.01 ETH");
  });

  it("should fail if non-owner tries to mint", async () => {
    await expect(
      ticket.connect(addr1).mintTicket(addr1.address, {
        value: ethers.parseEther("0.01"),
      })
    ).to.be.revertedWithCustomError(ticket, "OwnableUnauthorizedAccount");
  });

  it("should fail if max supply is reached", async () => {
    for (let i = 0; i < 100; i++) {
      await ticket.connect(owner).mintTicket(addr1.address, {
        value: ethers.parseEther("0.01"),
      });
    }

    await expect(
      ticket.connect(owner).mintTicket(addr1.address, {
        value: ethers.parseEther("0.01"),
      })
    ).to.be.revertedWith("Maximum Supply Reached");
  });

  it("should withdraw funds to owner", async () => {
    const initialBalance = await ethers.provider.getBalance(owner.address);

    const tx = await ticket.connect(owner).mintTicket(addr1.address, {
      value: ethers.parseEther("0.01"),
    });
    await tx.wait();

    const withdrawTx = await ticket.connect(owner).withDrawFunds();
    const receipt = await withdrawTx.wait();
    const gasUsed = receipt.gasUsed * withdrawTx.gasPrice;

    const finalBalance = await ethers.provider.getBalance(owner.address);
    expect(finalBalance).to.be.greaterThan(initialBalance - gasUsed - ethers.parseEther("0.01"));
  });
});
