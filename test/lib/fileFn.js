const fs = require('fs');
const fileStat = require('../../lib/fileStatus_module.js').c;
const execFile = require('child_process').execFile;

// <== CREATE NEW FILE ==> 
exports.createFile = (fileName = "nimisTestFile.txt") => {
    return new Promise((resolve, reject) => {
        let stream = fs.createWriteStream(fileName);
        stream.once('open', (fd) => {
            stream.write("FOO_BAR");
                stream.end(resolve());
        });
    })  
};


// <== DELETE FILE ==> 
exports.deleteFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.unlink(fileName, (err) => {
            if (err) throw err;
                resolve();
        });
    })
}; 


// <== OPEN ZIP/BINDED FILES ==> 
exports.openBindFile = async (zipFilePath, dest, decryptionKey) => {
        
    // EC - Check the incoming data path exists 
    let folderStatus = await fileStat(zipFilePath); 
    
    if (folderStatus === 'OK'){
          return new Promise((resolve, reject) => {
          execFile('unzip', ['-P', decryptionKey, zipFilePath, '-d', dest], function(err, stdout) {
        
    if(err){
        console.error('THE ZIP FILE SYSTEM HAS ENCOUNTERED AN ERROR - ', err); 
            reject(err); 
    }

    resolve();
});              
    
                
}) 
    } else if (folderStatus === 'FAIL'){
        throw 'FILE NOT FOUND, BIND MODULE ERROR.';
    } else {
        throw 'THE BIND MODULE HAS ENCOUNTERED A CRITICAL ERROR.';
    } 
}; 



// <== OPEN GZIP FILES ==> 
exports.openGzipFile = async (gzipFilePath) => {
    let currentFnExtraction = gzipFilePath; // DO NOT USE PATH
        let extExtraction = currentFnExtraction.slice((gzipFilePath.indexOf('.')), gzipFilePath.length);
    


    
    // EC - Check the incoming data path exists 
    let folderStatus = await fileStat(gzipFilePath); 
    
    if (folderStatus === 'OK'){
          return new Promise((resolve, reject) => {
          execFile('gunzip', [gzipFilePath], function(err, stdout) {
        
    if(err){
        console.error('THE ZIP FILE SYSTEM HAS ENCOUNTERED AN ERROR - ', err); 
            reject(err); 
    }

    resolve();
});              
    
                
}) 
    } else if (folderStatus === 'FAIL'){
        throw 'FILE NOT FOUND, BIND MODULE ERROR.';
    } else {
        throw 'THE BIND MODULE HAS ENCOUNTERED A CRITICAL ERROR.';
    } 
}; 