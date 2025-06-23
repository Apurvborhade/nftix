// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("🚀 Deploying contracts with:", deployer.address);

    const TicketFactory = await hre.ethers.getContractFactory("TicketFactory");
    const event = await TicketFactory.deploy();
    console.log("🎟️ TicketFactory deployed to:", event.target);

    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
