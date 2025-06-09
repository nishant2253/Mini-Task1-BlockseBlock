# Blockchain Mini Task Suite

## Prerequisites

- Node.js (v12 or higher recommended)

## Installation

No extra packages are needed beyond Node.js's built-in `crypto` module. To check if Node.js is installed, run:

```bash
node -v
```

## How to Run Each File

### 1. Blockchain Simulation

**File:** `blockchain_simulation.js`

**Run:**

```bash
node blockchain_simulation.js
```

**✅ Summary Table: How Code Solves Each Part of the Problem**
| 🧪 Requirement from Problem | ✅ Code Implementation |
|------------------------------------|----------------------------------------------------------------------------|
| Create Block class | ✅ class Block with index, timestamp, data, previousHash, hash, nonce |
| Use SHA-256 hash | ✅ crypto.createHash("sha256")... in calculateHash() |
| Link 3 blocks via previousHash | ✅ Genesis + 2 blocks added using previous block's hash |
| Display all blocks | ✅ console.log() for each block |
| Tamper with Block 1 | ✅ Changed data and recalculated hash for Block 1 |
| Show effect of tampering | ✅ Chain becomes invalid — isChainValid() returns false |
| Fix hashes to restore chain | ✅ Loop to fix previousHash and hash for all affected blocks |
| Verify fixed chain | ✅ isChainValid() confirms validity after fixing |

---

### 2. Mining Simulation

**File:** `mining_simulation.js`

**Run:**

```bash
node mining_simulation.js
```

**✅ Summary Table: Code vs Problem Statement**
| 🔧 Requirement from Problem | ✅ Code Implementation |
|------------------------------------|----------------------------------------------------------------------------|
| Add mineBlock() function | ✅ mineBlock(difficulty) in Block class |
| Hash must start with 0000 | ✅ this.hash.substring(0, difficulty) === target |
| Increment nonce until hash is valid | ✅ this.nonce++ in a loop |
| Print number of attempts | ✅ console.log("Attempts:", attempts) |
| Measure time taken | ✅ Date.now() for start and end timing |
| Simulate computational cost of PoW | ✅ Loop intensity increases with difficulty |

---

### 3. Consensus Mechanism Simulation

**File:** `consensus_demo.js`

**Run:**

```bash
node consensus_demo.js
```

**✅ Summary: Why This Code Works**
| Consensus | What's Simulated | How Code Handles It |
|-----------|-------------------------|-----------------------------------------------------|
| PoW | Highest computational power | Random power, select highest via reduce() |
| PoS | Highest financial stake | Random stake, select highest via reduce() |
| DPoS | Most popular delegate | Random voting, tally, select most voted |

---

## Notes

- All files use only built-in Node.js modules (no external dependencies).
- You can edit the difficulty or number of validators/voters in each file to experiment further.
