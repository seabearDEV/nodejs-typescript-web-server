import { expect, jest, test } from '@jest/globals';
import { index } from '../app/index.js';

test('Sanity check by making sure the index constant from app/index.ts is defined.', (done) => {
    setTimeout(() => {
        expect(index).toBeDefined();
        done();
    });
});