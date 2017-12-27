// @flow
import crypto from 'crypto';

const PoW = {
    proofOfWork: function(lastProof: number): number {
        let proof: number = 0;

        while(!this.isValidProof(lastProof, proof)) {
            proof += 1;
        }

        return proof;
    },

    isValidProof: function(lastProof: number, proof: number): boolean {
        const hashString: string = `${lastProof}${proof}`;
        const nextHash: string = crypto.createHash('sha256').update(hashString).digest('hex');

        return nextHash.substring(nextHash.length - 4) === '0000';
    }
}

export default PoW; 