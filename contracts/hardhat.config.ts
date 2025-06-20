import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const ALCHEMY_API_KEY = "Ahigq8fCUSeXAIACVLr2oxXDjGKQhU_k";

const SEPOLIA_PRIVATE_KEY = "5381cbbe336edf1b40722587ed2cf31641e18fc31ac027664a2ac56ed50ba93b";

const ETHERSCAN_API_KEY ="4MNTFTRDK576PMV6B2TQB9K11VTZQH9CMA";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};

export default config;
