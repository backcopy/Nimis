const execFile = require('child_process').execFile;
const fileStat = require('./fileStatus_module.js').c; 
const uniquePw = require('./unique_module.js').passwordGenerate; 

exports.c = async function (folder, dest){
    
    // Async wait for unique key to be generated
    let passwordKey = await uniquePw(); 
    
    // EC - Check the incoming data path exists 
    let folderStatus = await fileStat(dest); 
    
    if (folderStatus === 'OK'){
          return new Promise((resolve, reject) => {
          execFile('zip', ['-P', passwordKey, '-r', '-j', folder, dest], function(err, stdout) {
        
    if(err){
        console.error('THE ZIP FILE SYSTEM HAS ENCOUNTERED AN ERROR - ', err); 
            reject(err); 
    }

    resolve(passwordKey);
});              
    
                
}) 
    } else if (folderStatus === 'FAIL'){
        throw 'FILE NOT FOUND, BIND MODULE ERROR.';
    } else {
        throw 'THE BIND MODULE HAS ENCOUNTERED A CRITICAL ERROR.';
    } 
} 

