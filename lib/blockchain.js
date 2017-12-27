'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _PoW = require('./PoW');

var _PoW2 = _interopRequireDefault(_PoW);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Blockchain {

    constructor() {
        this.chain = [];
        this.currentTransactions = [];
        this.newBlock('1', 100);
    }

    newBlock(previousHash, proof) {
        const chainLength = this.chain.length;

        const block = {
            index: chainLength + 1,
            timestamp: Date.now(),
            transactions: this.currentTransactions,
            proof: proof,
            previousHash: previousHash || this.hash(this.chain[chainLength - 1])
        };

        this.currentTransactions = [];

        this.chain.push(block);

        return block;
    }

    newTransaction(sender, recipient, amount) {
        this.currentTransactions.push({
            sender,
            recipient,
            amount
        });

        return this.lastBlock['index'] + 1;
    }

    serializeBlockData(data) {
        const serialized = JSON.stringify(data);

        return serialized;
    }

    hash(data) {
        const blockString = this.serializeBlockData(data);

        return _crypto2.default.createHash('sha256').update(blockString).digest('hex');
    }

    get lastBlock() {
        const chainLength = this.chain.length;

        return this.chain[chainLength - 1];
    }
}

const newProof = _PoW2.default.proofOfWork(43875);

console.log(newProof);

exports.default = Blockchain;