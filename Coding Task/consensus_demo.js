// Consensus Mechanism Simulation
// Simulate and compare PoW, PoS, and DPoS logic

// ------------------------------
// Mock data setup for validators
// ------------------------------

// Mock miners for Proof of Work (PoW) with random computational power
const miners = [
  { name: "Miner1", power: Math.floor(Math.random() * 100) + 1 },
  { name: "Miner2", power: Math.floor(Math.random() * 100) + 1 },
  { name: "Miner3", power: Math.floor(Math.random() * 100) + 1 },
  { name: "Miner4", power: Math.floor(Math.random() * 100) + 1 },
];

// Mock stakers for Proof of Stake (PoS) with random staking amounts
const stakers = [
  { name: "Staker1", stake: Math.floor(Math.random() * 100) + 1 },
  { name: "Staker2", stake: Math.floor(Math.random() * 100) + 1 },
  { name: "Staker3", stake: Math.floor(Math.random() * 100) + 1 },
  { name: "Staker4", stake: Math.floor(Math.random() * 100) + 1 },
];

// Mock voters for Delegated Proof of Stake (DPoS)
const voters = [
  { name: "AccountA" },
  { name: "AccountB" },
  { name: "AccountC" },
  { name: "AccountD" },
  { name: "AccountE" },
  { name: "AccountF" },
  { name: "AccountG" },
];

// Delegates to be voted on in DPoS with initial vote count = 0
const delegates = [
  { name: "Delegate1", votes: 0 },
  { name: "Delegate2", votes: 0 },
  { name: "Delegate3", votes: 0 },
];

// ------------------------------
// Proof of Work (PoW) Simulation
// ------------------------------

console.log("--- Proof of Work (PoW) ---");

// Print each miner's power
miners.forEach((miner) => console.log(`${miner.name}'s power: ${miner.power}`));

// Select miner with the highest power (simulating mining competition)
const selectedMiner = miners.reduce(
  (max, m) => (m.power > max.power ? m : max),
  miners[0]
);

// Explain the selection logic and display the selected miner
console.log(
  "In PoW, the validator with the highest computational power is most likely to mine the next block."
);
console.log(
  `Selected validator: ${selectedMiner.name} (power: ${selectedMiner.power})\n`
);

// ------------------------------
// Proof of Stake (PoS) Simulation
// ------------------------------

console.log("--- Proof of Stake (PoS) ---");

// Print each staker's stake
stakers.forEach((staker) =>
  console.log(`${staker.name}'s stake: ${staker.stake}`)
);

// Select staker with the highest stake (simulating economic weight)
const selectedStaker = stakers.reduce(
  (max, s) => (s.stake > max.stake ? s : max),
  stakers[0]
);

// Explain the selection logic and display the selected staker
console.log(
  "In PoS, the validator with the highest stake is most likely to be chosen to validate the next block."
);
console.log(
  `Selected validator: ${selectedStaker.name} (stake: ${selectedStaker.stake})\n`
);

// -----------------------------------------
// Delegated Proof of Stake (DPoS) Simulation
// -----------------------------------------

console.log("--- Delegated Proof of Stake (DPoS) ---");
console.log("Voters and their randomly chosen delegates:");

// Simulate each voter voting for a randomly selected delegate
voters.forEach((voter) => {
  const delegateIndex = Math.floor(Math.random() * delegates.length); // Random index
  const chosenDelegate = delegates[delegateIndex]; // Get delegate
  voter.vote = chosenDelegate.name; // Store vote in voter's record
  chosenDelegate.votes++; // Increment vote count for the chosen delegate
  console.log(`${voter.name} votes for ${voter.vote}`);
});

// Select delegate with the highest vote count
const selectedDelegate = delegates.reduce(
  (max, d) => (d.votes > max.votes ? d : max),
  delegates[0]
);

// Explain the selection logic and display the chosen delegate
console.log(
  "In DPoS, each account votes for a randomly chosen delegate. The delegate with the most votes is selected."
);
console.log(
  `Selected delegate: ${selectedDelegate.name} (votes: ${selectedDelegate.votes})\n`
);
