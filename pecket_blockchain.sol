// Pecket Blockchain - DAG-Based Finality + Validator System
// Language: Solidity (EVM-Compatible for easy adoption)

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PecketToken {
    string public name = "Pecket";
    string public symbol = "PEC";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != address(0), "Invalid address");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(allowance[_from][msg.sender] >= _value, "Allowance exceeded");
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
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