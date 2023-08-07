// This is our implementation contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Box {
    uint256 internal num;

    event ValueChanged(uint256 NewValue);

    function setValue(uint256 newNum) public {
        unchecked {
            num = newNum;
        }

        emit ValueChanged(newNum);
    }

    function getNum() public view returns(uint256) {
        return num;
    }

    function getVersion() public pure returns(uint256) {
        return 1;
    }
}