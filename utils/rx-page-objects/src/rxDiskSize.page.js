/**
 * @namespace
 */
exports.rxDiskSize = {

    /**
     * @function
     * @param {String} rxDiskSizeString - The string to convert to bytes
     * @returns {Number} The number of bytes represented by the human readable byte size string
     * @example
     * expect(encore.rxDiskSize.toBytes('1000 MB')).to.equal(encore.rxDiskSize.toBytes('1 GB'));
     */
    toBytes: function (rxDiskSizeString) {
        var parts = rxDiskSizeString.split(' ');
        var size = parseFloat(parts[0]);
        var magnitude = {
            'B': 1,
            'K': Math.pow(10, 3),
            'M': Math.pow(10, 6),
            'G': Math.pow(10, 9),
            'T': Math.pow(10, 12),
            'P': Math.pow(10, 15)
        }[parts[1].toUpperCase()[0]];
        return size * magnitude;
    },

    /**
     * @function
     * @description A shorthand way of converting a bytes string to gigabytes.
     * @param {String} rxDiskSizeString - The string to convert to gigabytes
     * @returns {Number} The number of gigabytes represented by the human readable byte size string
     * @example
     * expect(encore.rxDiskSize.toGigabytes('1000 MB')).to.equal(1);
     */
    toGigabytes: function (rxDiskSizeString) {
        return this.toBytes(rxDiskSizeString) / Math.pow(10, 9);
    }

};
