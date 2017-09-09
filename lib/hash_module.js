const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

exports.File = async function(fileLocation){
    let hash = crypto.createHash('sha512');
    let stream = fs.createReadStream(fileLocation);
    
    return new Promise((resolve, reject) => {
        stream.on('error', err => reject(err));
            stream.on('data', chunk => hash.update(chunk));
                stream.on('end', () => {
                    resolve(hash.digest('hex'));
    })
        
    })
    
}
