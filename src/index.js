// @flow

import express from 'express';
import bodyParser from 'body-parser';
import uuidv4 from 'uuid/v4';
import PoW from './PoW';
import Blockchain from './blockchain';
import { objectHasRequiredKeys } from './tools';

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const identifier = uuidv4().replace('-', '');
const blockchain = new Blockchain();

app.get('/mine', (req, res) => {
    const lastBlock = blockchain.lastBlock;
    const lastProof = lastBlock.proof;
    const proof = PoW.proofOfWork(lastProof);

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
    const values: Object = req.body;
    const required: Array<string> = ['sender', 'recipient', 'amount'];

    if (!objectHasRequiredKeys(values, required)) {
        res.status(400).send('Not all values specified!');
        return;
    }
    
    const { sender, recipient, amount } = values;
    const index = blockchain.newTransaction(sender, recipient, amount);

    res.status(201).json({ 
        message: `Transaction will be added to Block ${index}` 
    });
});

app.get('/chain', (req, res) => {
    const chainData = {
        chain: blockchain.chain,
        length: blockchain.chain.length,
    };

    res.json(chainData);
});

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});