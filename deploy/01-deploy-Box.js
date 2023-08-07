const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("-----------------------------");
    const box = await deploy("Box", {
      from: deployer,
      args: [],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
      /*
       * Here we are deploying the proxy contract using the Openzeppelin library
       * and this contract will be deployed using a admin contract rather a admin address
       */
      proxy: {
        proxyContract: "OpenZeppelinTransparentProxy",
        viaAdminContract: {
          name: "BoxProxyAdmin",
          artifact: "BoxProxyAdmin",
        },
      },
    });


    if (
      !developmentChains.includes(network.name) &&
      process.env.Etherscan_API_KEY
    ) {
        log("verifying................");
        await verify(box.address, [])
    }
}

module.exports.tags = ["all", "Box"];

/*
deploying "BoxProxyAdmin" (tx: 0x1472653c556d77289e8f4598d1a381904caa06e3d81cfb5891b38e0faf0317ea)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 789859 gas

It renamed the box contract to "Box-Implementation" this has our logic 
deploying "Box_Implementation" (tx: 0x5662c8e4f78e14bdbb66345afad666233de17d04ed2e5cfa142e47ae1a18f257)...: deployed at 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 with 148465 gas

This is our proxy contract this will point to Box Implementation 
deploying "Box_Proxy" (tx: 0x0a065bb387e7859f7f0b05e080b17f076be09b45ee5ecd523ac364cd71e81731)...: deployed at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 with 544521 gas

*/