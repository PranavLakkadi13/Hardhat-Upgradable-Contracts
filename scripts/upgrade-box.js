const { ethers } = require("hardhat");

// Manual way
async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
    
    // This is the actual proxy contract renamed by hardhat
    const transparentProxy = await ethers.getContract("Box_Proxy");

  
  // The old version of ethers --> version ^5 use contract.address
  // The verison ^6 uses contract.getAddress()
    const proxyBoxV1 = await ethers.getContractAt(
      "Box",
      await transparentProxy.getAddress()
    );

    const version1 = await proxyBoxV1.getVersion();
    console.log(version1);
    
    const boxV2 = await ethers.getContract("BoxV2");

    const upgradeTx = await boxProxyAdmin.upgrade(await transparentProxy.getAddress(), await boxV2.getAddress());
    await upgradeTx.wait(1);

    const proxyBoxV2 = await ethers.getContractAt("BoxV2", await transparentProxy.getAddress());
    const version2 = await proxyBoxV2.getVersion();
    console.log(version2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
      process.exit(1);
});
