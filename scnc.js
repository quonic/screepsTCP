/**
 * SCNC - Screeps Creep Network Connection
 */


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
MEMORY_NAME = "scnc";


/**
 *
 * @type {{assignCreeps: SCNC.assignCreeps, input: SCNC.input, output: SCNC.output}}
 */
var SCNC = {
    /**
     *
     * @param creeps
     * @returns {boolean}
     */
    assignCreeps: function (creeps) {
        Memory[MEMORY_NAME] = [];
        if (typeof creeps[0].name == "string") {
            for (let creep in creeps) {
                Memory[MEMORY_NAME].push(creep.id);
            }
            
            return true;
        }
        return false;
    },
    /**
     *
     * @param room - Expect only one room. Call more than once for each coms room.
     * @returns {string}
     */
    input: function (room) {
        let creeps = Game.rooms[room].find(FIND_HOSTILE_CREEPS, {
            filter: function (c) {
                if (c.getActiveBodyParts(MOVE) > 1) {
                    return c.id;
                }
            }
        });
        let message = "";
        if (creeps.length == 0) { // no creeps to get messages from
            return message;
        }
        
        for (let creep in creeps) {
            message = message + "," + Game.getObjectById(creep).saying;
        }
        message = message.split(",").sort(function (a, b) {
            return a[0] - b[0]
        }); // sort based on the first character, untested.
        let messages = message;
        message = "";
        for (let i in messages) {
            message = message + i.replace(/^[0-9]/, "");
        }
        return message;
    },
    /**
     *
     * @param room
     * @param message
     * @returns {boolean}
     */
    output: function (room, message) {
        let messageSplit = splitString(message, 9);
        
        if (Memory[MEMORY_NAME].length < messageSplit.length) {
            //Mismatch Can't send message in one tick, must split message up into more ticks.
        }
        for (let i = 0; i < Memory[MEMORY_NAME].length && i < messageSplit.length; i++)
            for (let creep in Memory[MEMORY_NAME]) {
                creep.say(i + messageSplit[i], true);
            }
        return true;
    }
    
    
};

module.exports = SCNC;
