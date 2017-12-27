'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PoW = {
    proofOfWork: function (lastProof) {
        let proof = 0;

        while (!this.isValidProof(lastProof, proof)) {
            proof += 1;
        }

        return proof;
    },

    isValidProof: function (lastProof, proof) {
        const hashString = '' + lastProof + proof;
        const nextHash = _crypto2.default.createHash('sha256').update(hashString).digest('hex');

        return nextHash.substring(nextHash.length - 4) === '0000';
    }
};
exports.default = PoW;