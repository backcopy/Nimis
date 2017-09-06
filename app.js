const fs = require('fs'); 
const crypto = require('crypto'); 
const zlib = require('zlib'); 

// Webbing function (for hashing) e
function hashCallback(hash){
    console.log(`SHA512 HASH: ${hash}`)
}

// File compression 
function backupFile(fileName, outputName){
    var gzip = zlib.createGzip({
    level: 9}), 
    buffers=[], 
    nread=0;
    
let r = fs.createReadStream(`${fileName}`); // Input file 
let w = fs.createWriteStream(`${outputName}.gz`); // Output file 
    let compressEvent = r.pipe(gzip).pipe(w);
    
    // Stream event completed 
    compressEvent.on('finish', function(){
        // Double checking 
        if (fs.existsSync(`${outputName}.gz`)) {
    let hash = crypto.createHash('sha512');
    let stream = fs.createReadStream(`${outputName}.gz`);
       
    stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => hashCallback(hash.digest('hex')));
        }
    });    
}; 





