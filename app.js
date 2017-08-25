const fs = require('fs') 
const crypto = require('crypto'); 
const zlib = require('zlib'); 

// File hashing function
let fileHash = (path) => {
   return new Promise((resolve, reject) => {
    let hash = crypto.createHash('sha512');
    let stream = fs.createReadStream(path);
       
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hashCallback(hash.digest('hex'))));
  });  
}; 

// Webbing function (for hashing) 
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
    r.pipe(gzip).pipe(w)
        let fileGzip = new Promise((resolve, reject) => { 
            // Confirm the file has been compressed
  if (fs.existsSync(`${outputName}.gz`)) {
    resolve(console.log('FILE COMPRESSED: [OK]'));
}
  setTimeout(() => {
     fileHash(`${outputName}.gz`);
        }, 50);
    });
}; 


backupFile('example2.js', 'foobaroa1');


