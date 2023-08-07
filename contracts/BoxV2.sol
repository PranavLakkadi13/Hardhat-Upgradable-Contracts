// This is our implementation contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract BoxV2 {
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
        return 2;
    }

    function increment() public {
        unchecked {
            num = num + 11;
        }

        emit ValueChanged(num);
    }
}