import { MerkleTree } from 'merkletreejs'
import { keccak256 } from 'ethers/lib/utils'

export async function generateTree(): Promise<MerkleTree> {

    let allowList = [
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        '0x0000000000000000000000000000000000000002',
        '0x0000000000000000000000000000000000000003',
        '0x0000000000000000000000000000000000000004',
        '0x0000000000000000000000000000000000000005',
        '0x0000000000000000000000000000000000000006',
    ]

    const leaves = allowList.map((address) => keccak256(address))
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })

    const root = tree.getHexRoot()
    console.log('Merkle root:', root)
    console.log('Merkle tree:\n', tree.toString())

    return tree
}

generateTree()

