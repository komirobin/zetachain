import { parseEther } from "@ethersproject/units";
import { getAddress } from "@zetachain/addresses";
import { ethers } from "hardhat";

import { createZetaEthPoolUniV2 } from "../test/uniswapV3.helpers";

async function main() {
  const [deployer] = await ethers.getSigners();

  const zetaTokenAddr = getAddress("zetaToken");
  const WETHAddress = getAddress("weth9");
  const UNI_NFT_MANAGER_V3 = getAddress("uniswapV3NftManager", {
    customNetworkName: "eth-mainnet",
    customZetaNetwork: "mainnet",
  });

  const UNI_FACTORY_V3 = getAddress("uniswapV3Factory", {
    customNetworkName: "eth-mainnet",
    customZetaNetwork: "mainnet",
  });

  await createZetaEthPoolUniV2({
    ETHToAdd: parseEther("1"),
    WETHAddress,
    deployer,
    uniswapFactoryV3Address: UNI_FACTORY_V3,
    uniswapNFTManagerV3Address: UNI_NFT_MANAGER_V3,
    zetaToAdd: parseEther("0.005"),
    zetaTokenAddress: zetaTokenAddr,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
