// Import the crypto module to use SHA-256 hashing
const crypto = require("crypto");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index; // Block position in the chain
    this.timestamp = timestamp; // Time when the block was created
    this.data = data; // Block data (e.g., transactions)
    this.previousHash = previousHash; // Hash of the previous block to maintain chain integrity
    this.nonce = 0; // Number used once, incremented during mining to find valid hash
    this.hash = this.calculateHash(); // Current block's hash, calculated from block content
  }

  // Calculate the SHA-256 hash of the block contents including nonce
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) + // Convert data to string for hashing
          this.previousHash +
          this.nonce // Nonce changes every iteration during mining
      )
      .digest("hex"); // Return hash in hexadecimal format
  }

  // Perform Proof-of-Work by mining the block
  // Difficulty specifies how many leading zeros the hash must have
  mineBlock(difficulty) {
    const target = Array(difficulty + 1).join("0"); // String of zeros equal to difficulty
    let attempts = 0; // Counter for how many nonces tried
    const startTime = Date.now(); // Start timer

    // Keep changing nonce until hash starts with required number of zeros
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++; // Increment nonce to change hash
      attempts++; // Count this attempt
      this.hash = this.calculateHash(); // Recalculate hash with new nonce
    }

    const endTime = Date.now(); // End timer

    // Log mining result details
    console.log(`Block mined: ${this.hash}`); // Final hash that satisfies difficulty
    console.log(`Attempts: ${attempts}`); // Total attempts made to mine
    console.log(`Time taken: ${(endTime - startTime) / 1000} seconds`); // Mining duration in seconds
  }
}

// Example usage:
const difficulty = 4; // Set difficulty: hash must start with '0000'
const block = new Block(1, Date.now().toString(), { amount: 50 }, "0"); // Create new block
console.log("Mining block...");
block.mineBlock(difficulty); // Start mining the block with given difficulty
