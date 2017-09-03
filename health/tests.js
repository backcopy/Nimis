const fs = require('fs');
const crypto = require('crypto'); 
const Async = require('async');
const zlib = require('zlib');

    // ******************************************************
    // *** SYSTEM HEALTH ENGINE 
    // ******************************************************

    // ******************************************************
    // The system health engine will perform certain checks
    // to ensure the system is ready for Nimis to be used. 
    // ******************************************************


// Console logger 
function log(msg){
    console.log(msg); 
}; 


// Webbing function (for hashing) 
function hashCallback(hash){
    console.log(`SHA512 HASH: ${hash}`)
}

Async.waterfall([
    // ******************************************************
    // *** CREATE FILE ON THE DISC
    // ******************************************************
    function createNewFile(cb){
let writeFile = fs.createWriteStream('health/EfGms19zZeeAjxc.txt', { 
    flags: 'a' // preservation 
})

writeFile.write('abMDGFj158mnasdmE') // inject into the file
writeFile.end(function(){
    console.log('FILE(S) CREATED ON DISC: [OK]');
    cb(null); 
})
}, 

    // ******************************************************
    // *** PERFORM HASH CHECKS OF NORMAL CREATED FILE(S)
    // ******************************************************
function compareFileHash(cb){
    let hash = crypto.createHash('sha512');
    let stream = fs.createReadStream(`health/EfGms19zZeeAjxc.txt`);
   // stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => {
                let finalHash = hash.digest('hex'); 
                if (finalHash === '0ab7356589701efd092abf0d6c1b366ebb40ba431308797c795b3290746610cbe1b3e50d557de084aef7071ad01d8549bf403be278679b6871d2109e64e70b96'){
                    log('NORMAL FILE HASH CHECK: [OK]');
                    cb(null);
        } else {
            log('NORMAL FILE HASH CHECK: [FAILED]');
            cb(null);
        }
    });
},
    
    // ******************************************************
    // *** TEST THE GZIP FUNCTIONALITY ON THE SYSTEM
    // ******************************************************
function zipFile(cb){
    var gzip = zlib.createGzip({
    level: 9}), 
    buffers=[], 
    nread=0;
    
let r = fs.createReadStream('health/EfGms19zZeeAjxc.txt'); // Input file 
let w = fs.createWriteStream('health/EfGms19zZeeAjxc.gz'); // Output file 
    let compressEvent = r.pipe(gzip).pipe(w);
    
    // Stream event completed 
    compressEvent.on('finish', function(){
        // Double checking 
        if (fs.existsSync('health/EfGms19zZeeAjxc.gz')) {
            log('GZIP FILE FUNCTIONALITY: [OK]')
            cb(null);
        } else {
            log('GZIP FILE FUNCTIONALITY: [FAILED]')
            cb(null);           
        }
    });    
},

    // ******************************************************
    // *** PERFORM HASH CHECKS OF GZIP CREATED FILE(S)
    // ******************************************************
function compareFileHashZip(cb){
    let hash = crypto.createHash('sha512');
    let stream = fs.createReadStream(`health/EfGms19zZeeAjxc.gz`);
    stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => {
                let finalHash = hash.digest('hex'); 
                if (finalHash === 'b6c69c8f663284bf9b1a4c59098183039de6ccd894767e3d7ae5406302e3bba1c150d5c0433ad6ee8ffad26edaa6075e31b61a9c19653eb86f26a33c133199de'){
                    log('GZIP FILE HASH CHECK: [OK]');
                    cb(null);
        } else {
            log('GZIP FILE HASH CHECK: [FAILED]');
            cb(null);
        }
    });
},
   

    // ******************************************************
    // *** DELETE THE FILE(S) FROM THE DISC
    // ******************************************************
function deleteFile(cb){
    if (fs.existsSync('health/EfGms19zZeeAjxc.txt')){
      fs.unlinkSync('health/EfGms19zZeeAjxc.txt');
        fs.unlinkSync('health/EfGms19zZeeAjxc.gz');
        if (fs.existsSync('health/EfGms19zZeeAjxc.txt' || 'health/EfGms19zZeeAjxc.gz')){
            console.log('FILE(S) DELETED ON DISC: [FAILED]');
            cb(null);
    } else {
            console.log('FILE(S) DELETED ON DISC: [OK]');
            cb(null);
    } 
    } else {
        console.log('FILE(S) DELETED ON DISC: [FAILED]');
        cb(null);
    }
}
   
]); 




