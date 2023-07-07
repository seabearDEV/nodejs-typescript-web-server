import { expect } from '@jest/globals';
import { web } from '../app/index.js';

test('Make sure the port and server properties are defined', (done) => {
    setTimeout(() => {
        expect(web.port).toBe(4242);
        done();
    });
});