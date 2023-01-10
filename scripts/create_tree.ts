async function generateTree() {
    const { MerkleTree } = require('merkletreejs')
    const keccak256 = require('keccak256')

    let allowList = [
        '0x0000000000000000000000000000000000000001',
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

    // Check proof for first address
    const checkAddr = '0x0000000000000000000000000000000000000001'
    const hashedAddr = keccak256(checkAddr)
    const proof = tree.getHexProof(hashedAddr)
    console.log('Proof for', checkAddr, ':\n', proof)

    const verified = tree.verify(proof, hashedAddr, root)
    console.log('Verified:', verified)

    return tree
}

generateTree()

