const fs = require('fs');
const crypto = require('crypto'); 

let writeFile = fs.createWriteStream('health/EfGms19zZeeAjxc.txt', {
  flags: 'a' // preservation 
})

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

writeFile.write('abMDGFj158mnasdmE') // inject into the file

writeFile.end(function(){
    // ******************************************************
    // *** CHECK IF THE FILE HAS BEEN CREATED ON THE DISK
    // ******************************************************
    if (fs.existsSync('health/EfGms19zZeeAjxc.txt')){
        log('FILE CREATED ON DISK: [OK]');
} 
    // ******************************************************
    // *** CHECK IF THE CREATED FILE MAINTAINED INTEGRITY
    // ******************************************************
let fileData = fs.readFileSync('health/EfGms19zZeeAjxc.txt', "utf8");
    if (fileData === 'abMDGFj158mnasdmE'){
        log('FILE INTEGRITY CHECK: [OK]'); 
    } else {
        log('FILE INTEGRITY CHECK: [FAILED]'); 
    }
    // ******************************************************
    // *** CHECK IF HASHING FUNCTIONS ARE WORKING CORRECTLY
    // ******************************************************
    let hash = crypto.createHash('sha512');
    let stream = fs.createReadStream(`health/EfGms19zZeeAjxc.txt`);
       
    stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => {
                let finalHash = hash.digest('hex'); 
                if (finalHash === '0ab7356589701efd092abf0d6c1b366ebb40ba431308797c795b3290746610cbe1b3e50d557de084aef7071ad01d8549bf403be278679b6871d2109e64e70b96'){
                    log('FILE HASH CHECK: [OK]'); 
                }
            });
}); 

