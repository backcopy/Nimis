const execFile = require('child_process').execFile;
const fileStat = require('./fileStatus_module.js').c; 

exports.c = async function (folder, dest){
    
    // EC - Check the incoming data path exists 
    let folderStatus = await fileStat(dest); 
    
    if (folderStatus === 'OK'){
          return new Promise((resolve, reject) => {
          execFile('zip', ['-r', '-j', folder, dest], function(err, stdout) {
        
    if(err){
        console.error('THE ZIP FILE SYSTEM HAS ENCOUNTERED AN ERROR - ', err); 
            reject(err); 
    }

    resolve();
});              
    
                
})
    } else if (folderStatus === 'FAIL'){
        throw new Error('FILE NOT FOUND, BIND MODULE ERROR.')
    } else {
        throw new Error('THE BIND MODULE HAS ENCOUNTERED A CRITICAL ERROR.')
    }
  
    
    
}; 