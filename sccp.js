/**
 * SCCP - Screeps Creep Communication Protocol
 */

var scnc = require("scnc");

// Helper functions
/**
 * Split a string into chunks of the given size
 *
 * @param  {String} string is the String to split
 * @param  {Number} size is the size you of the cuts
 * @return {Array} an Array with the strings
 */
function splitString(string, size) {
    var re = new RegExp('.{1,' + size + '}', 'g');
    return string.match(re);
}


// Constants
/**
 * The name used for storing creeps that will be used for communication
 *
 * @type {string}
 */
MEMORY_NAME = "sccp";


/**
 *
 * @type {{assignCreeps: SCCP.assignCreeps, input: SCCP.input, output: SCCP.output}}
 */
var SCCP = {
    
    
    
};

module.exports = SCCP;
