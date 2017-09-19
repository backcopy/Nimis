const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

const fileStat = require('./fileStatus_module.js').c; 


exports.File = async function(fileLocation){
    let hash = crypto.createHash('sha512');
    // EC - Check if fileLocation exists before going further. 
    let fileStatus = await fileStat(fileLocation); 
    
    if (fileStatus === 'OK'){
        let stream = fs.createReadStream(fileLocation);
    
    return new Promise((resolve, reject) => {
        stream.on('error', err => reject(err));
            stream.on('data', chunk => hash.update(chunk));
                stream.on('end', () => {
                    let hashValue = hash.digest('hex'); 
    
        // EC - Error checking for default null hash and other errors.  
                    // ### CRITICAL BROKEN ### 
    if (hashValue === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' ||
       '0', '1', 0, 1, null){
            throw 'THE HASH MODULE HAS ENCOUNTERED A CRITICAL ERROR.'
    } else {
        resolve(hashValue);
                    }
                })
            })
    } else if (fileStatus === 'FAIL'){
        throw 'FILE NOT FOUND, UNABLE TO COMPUTE HASH.';
    } else {
        throw 'THE HASH MODULE HAS ENCOUNTERED A CRITICAL ERROR.';
    } 
}
