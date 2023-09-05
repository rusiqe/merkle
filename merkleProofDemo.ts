import MerkleTree from 'merkletreejs';
import * as ethUtil from 'ethereumjs-util';

// Define the email addresses for whitelisting
const emailAddresses = [
  'alice@example.com',
  'bob@example.com',
  'charlie@example.com',
];

// Function to convert a string to a hex-encoded buffer
function stringToHexBuffer(str: string): Buffer {
  return Buffer.from(str, 'utf-8');
}

// Function to hash an email address
function hashEmail(email: string): string {
  const buffer = stringToHexBuffer(email); // Convert the email to a hex-encoded buffer
  return ethUtil.bufferToHex(ethUtil.keccak(buffer));
}

// Create an array of hashed email addresses
const hashedEmails = emailAddresses.map((email) => hashEmail(email));

// Create a Merkle Tree from the hashed email addresses
const merkleTree = new MerkleTree(hashedEmails, ethUtil.keccak, {
  sortPairs: true,
});

// Email address to prove
const emailToProve = 'alice@example.com';

// Hash the email to prove
const emailToProveHash = hashEmail(emailToProve);

// Generate a Merkle Proof for the email
const proof = merkleTree.getProof(emailToProveHash);

// Display the Merkle Proof
console.log('Merkle Proof for', emailToProve);
console.log(proof);
