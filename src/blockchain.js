// @flow
import crypto from 'crypto';
import { URL } from 'url';
import PoW from './PoW';

type Block = {
    index: number,
    timestamp: number,
    transactions: Array<Object>,
    proof: number,
    previousHash: string,
};

type Transaction = {
    sender: string,
    recipient: string,
    amount: number,
};

class Blockchain {
    chain: Array<Object>;
    currentTransactions: Array<Object>;
    nodes: Array<string>;

    constructor() {
        this.chain = [];
        this.currentTransactions = [];
        this.newBlock('1', 100)
    }

    registerNode(address: string) {
        const parsedUrl = new URL(address);

        this.nodes.push(parsedUrl.hostname);
    }

    newBlock(previousHash: string, proof: number): Object {
        const chainLength: number = this.chain.length;

        const block: Block = {
            index: chainLength + 1,
            timestamp: Date.now(),
            transactions: this.currentTransactions,
            proof: proof,
            previousHash: previousHash || this.hash(this.chain[chainLength - 1]),
        };
        
        this.currentTransactions = [];

        this.chain.push(block);

        return block;
    }

    newTransaction(from: string, to: string, amount: number): number {
        this.currentTransactions.push({
            from,
            to,
            amount,
        });

        return this.lastBlock['index'] + 1;
    }

    serializeBlockData(data: Object): string {
        const serialized = JSON.stringify(data);

        return serialized;
    }

    hash(data: Object): string {
        const blockString = this.serializeBlockData(data);

        return crypto.createHash('sha256').update(blockString).digest('hex');
    }

    get lastBlock(): Object {
        const chainLength = this.chain.length;

        return this.chain[chainLength - 1];
    }
}

// const newProof = PoW.proofOfWork(43875);

// console.log(newProof);

export default Blockchain;