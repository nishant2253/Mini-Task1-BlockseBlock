// Import the crypto module to use SHA-256 hashing
const crypto = require("crypto");

// Define a Block class
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index; // Position of the block in the chain
    this.timestamp = timestamp; // Time of block creation
    this.data = data; // Data the block holds (e.g., transaction info)
    this.previousHash = previousHash; // Hash of the previous block
    this.nonce = 0; // Optional field for future use (e.g., mining)
    this.hash = this.calculateHash(); // Current block's hash based on its content
  }

  // Method to calculate the SHA-256 hash of the block
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.previousHash +
          this.nonce
      )
      .digest("hex"); // Returns the hash in hexadecimal format
  }
}

// Initialize the blockchain as an empty array
let blockchain = [];

// Create the Genesis Block (first block of the blockchain)
const genesisBlock = new Block(0, Date.now().toString(), { amount: 100 }, "0");
blockchain.push(genesisBlock); // Add the genesis block to the chain

// Add 2 more blocks to the blockchain
for (let i = 1; i < 3; i++) {
  const prevBlock = blockchain[blockchain.length - 1]; // Get the last block in the chain
  const newBlock = new Block(
    i,
    Date.now().toString(),
    { amount: 100 + i * 10 }, // Just some different data for each block
    prevBlock.hash // Link to the previous block using its hash
  );
  blockchain.push(newBlock); // Add the new block to the chain
}

// Display the original blockchain
console.log("--- Initial Blockchain ---");
blockchain.forEach((block, idx) => {
  console.log(`Block ${idx}:`, block);
});

// Tampering with Block 1's data to simulate an attack
console.log("\n--- Tampering with Block 1 ---");
blockchain[1].data = { amount: 999 }; // Modify the data
blockchain[1].hash = blockchain[1].calculateHash(); // Recalculate hash to reflect tampered data

// Display blockchain after tampering
blockchain.forEach((block, idx) => {
  console.log(`Block ${idx}:`, block);
});

// Function to check whether the blockchain is valid
function isChainValid(chain) {
  for (let i = 1; i < chain.length; i++) {
    const current = chain[i];
    const previous = chain[i - 1];

    // Check if current block's hash matches recalculated hash
    if (current.hash !== current.calculateHash()) {
      return false;
    }

    // Check if current block’s previousHash matches actual hash of previous block
    if (current.previousHash !== previous.hash) {
      return false;
    }
  }
  return true;
}

// Check if blockchain is still valid after tampering
console.log("\nIs blockchain valid after tampering?", isChainValid(blockchain));

// Fix the blockchain by recalculating hashes from the tampered block onward
for (let i = 1; i < blockchain.length; i++) {
  blockchain[i].previousHash = blockchain[i - 1].hash; // Correct the previousHash
  blockchain[i].hash = blockchain[i].calculateHash(); // Recalculate the hash
}

// Display blockchain after fixing it
console.log("\n--- After Recomputing Hashes ---");
blockchain.forEach((block, idx) => {
  console.log(`Block ${idx}:`, block);
});

// Check if blockchain is valid after fixing the hashes
console.log("Is blockchain valid after fixing?", isChainValid(blockchain));
