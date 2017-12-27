'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _PoW = require('./PoW');

var _PoW2 = _interopRequireDefault(_PoW);

var _blockchain = require('./blockchain');

var _blockchain2 = _interopRequireDefault(_blockchain);

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

const identifier = (0, _v2.default)().replace('-', '');
const blockchain = new _blockchain2.default();

app.get('/mine', (req, res) => {
    const lastBlock = blockchain.lastBlock;
    const lastProof = lastBlock.proof;
    const proof = _PoW2.default.proofOfWork(lastProof);

    blockchain.newTransaction('0', identifier, 1);

    const previousHash = blockchain.hash(lastBlock);
    const block = blockchain.newBlock(previousHash, proof);
    
    const newBlockData = {
        message: 'Mined new Block',
        index: block.index,
        transactions: block.transactions,
        proof: block.proof,
        previousHash: block.previousHash
    };

    res.json(newBlockData);
});

app.post('/transactions/new', (req, res) => {
    const values = req.query;
    const required = ['sender', 'recipient', 'amount'];

    if (!(0, _tools.objectHasRequiredKeys)(values, required)) {
        res.status(400).send('Not all values specified!');
        return;
    }

    const { sender, recipient, amount } = values;
    const index = blockchain.newTransaction(sender, recipient, amount);

    res.status(201).json({
        message: 'Transaction will be added to Block ' + index
    });
});

app.get('/chain', (req, res) => {
    const chainData = {
        chain: blockchain.chain,
        length: blockchain.chain.length
    };

    res.json(chainData);
});

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});