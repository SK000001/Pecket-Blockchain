// Pecket Blockchain - DAG-Based Finality + Validator System
// Language: Solidity (EVM-Compatible for easy adoption)

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PecketToken is ERC20, Ownable {
    constructor(uint256 _initialSupply) ERC20("Pecket", "PEC") Ownable(msg.sender) {
        _mint(msg.sender, _initialSupply * 10 ** decimals());
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}

contract PecketStaking {
    PecketToken public token;
    uint256 public minStake = 1000 * 10**18;
    uint256 public rewardRate = 5; // 5% APY
    
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public rewardDebt;
    mapping(address => bool) public isValidator;
    address[] public validators;
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event ValidatorRegistered(address indexed validator);
    event ValidatorRemoved(address indexed validator);
    
    constructor(PecketToken _token) {
        token = _token;
    }

    function stake(uint256 _amount) public {
        require(_amount >= minStake, "Minimum stake required");
        require(token.transferFrom(msg.sender, address(this), _amount), "Stake transfer failed");
        
        stakes[msg.sender] += _amount;
        rewardDebt[msg.sender] = block.timestamp;
        
        if (!isValidator[msg.sender]) {
            isValidator[msg.sender] = true;
            validators.push(msg.sender);
            emit ValidatorRegistered(msg.sender);
        }
        
        emit Staked(msg.sender, _amount);
    }
    
    function unstake(uint256 _amount) public {
        require(stakes[msg.sender] >= _amount, "Insufficient stake");
        
        stakes[msg.sender] -= _amount;
        require(token.transfer(msg.sender, _amount), "Unstake transfer failed");
        
        if (stakes[msg.sender] < minStake && isValidator[msg.sender]) {
            isValidator[msg.sender] = false;
            removeValidator(msg.sender);
            emit ValidatorRemoved(msg.sender);
        }
        
        emit Unstaked(msg.sender, _amount);
    }
    
    function removeValidator(address _validator) internal {
        for (uint256 i = 0; i < validators.length; i++) {
            if (validators[i] == _validator) {
                validators[i] = validators[validators.length - 1];
                validators.pop();
                break;
            }
        }
    }
    
    function getValidators() public view returns (address[] memory) {
        return validators;
    }
}

contract PecketFinality {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
        bytes32 parent1;
        bytes32 parent2;
    }
    
    mapping(bytes32 => Transaction) public transactions;
    event TransactionFinalized(bytes32 indexed txHash, address sender, address receiver, uint256 amount);
    
    function submitTransaction(address _receiver, uint256 _amount, bytes32 _parent1, bytes32 _parent2) public {
        require(_amount > 0, "Transaction amount must be greater than zero");
        
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, _receiver, _amount, block.timestamp, _parent1, _parent2));
        transactions[txHash] = Transaction(msg.sender, _receiver, _amount, block.timestamp, _parent1, _parent2);
        
        emit TransactionFinalized(txHash, msg.sender, _receiver, _amount);
    }
}