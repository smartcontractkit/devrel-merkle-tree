import { expect } from "chai";
import { ethers } from "hardhat";
import { generateTree } from "../scripts/merkletree"
import { keccak256 } from 'ethers/lib/utils'

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("MerkleTree", function () {
  it("Should verify a valid proof", async function () {
    const tree = await generateTree();
    const root = tree.getHexRoot();
    const [addr] = await ethers.getSigners();
    const hashedAddr = keccak256(addr.address)
    console.log('Looking For: ' + addr.address + ' -> ' + hashedAddr)
    const proof = tree.getHexProof(hashedAddr)
    const Merkle = await ethers.getContractFactory("Merkle");
    const merkle = await Merkle.deploy(root);
    await merkle.deployed();

    expect(await merkle.verify(proof)).to.equal(true);

  })
  it("Should fail an invalid proof", async function () {
    const tree = await generateTree();
    const root = tree.getHexRoot();
    const [_, addr2] = await ethers.getSigners();
    const hashedAddr = keccak256(addr2.address)
    console.log('Looking For: ' + addr2.address + ' -> ' + hashedAddr)
    const proof = tree.getHexProof(hashedAddr)
    const Merkle = await ethers.getContractFactory("Merkle");
    const merkle = await Merkle.deploy(root);
    await merkle.deployed();

    expect(await merkle.connect(addr2).verify(proof)).to.equal(false);

  })
})
