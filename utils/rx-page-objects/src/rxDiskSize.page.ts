'use strict';

/**
 * @namespace
 */
export namespace rxDiskSize {

    /**
     * @example
     * expect(encore.rxDiskSize.toBytes('1000 MB')).to.equal(encore.rxDiskSize.toBytes('1 GB'));
     */
    export function toBytes(rxDiskSizeString: string): number {
        let parts = rxDiskSizeString.split(' ');
        let size = parseFloat(parts[0]);

        let magnitude = {
            B: 1,
            K: Math.pow(10, 3),
            M: Math.pow(10, 6),
            G: Math.pow(10, 9),
            T: Math.pow(10, 12),
            P: Math.pow(10, 15),
        }[parts[1].toUpperCase()[0]];
        return size * magnitude;
    }

    /**
     * @description A shorthand way of converting a bytes string to gigabytes.
     * @example
     * expect(encore.rxDiskSize.toGigabytes('1000 MB')).to.equal(1);
     */
    export function toGigabytes(rxDiskSizeString: string): number {
        return this.toBytes(rxDiskSizeString) / Math.pow(10, 9);
    }
};
