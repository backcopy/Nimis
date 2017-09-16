const execFile = require('child_process').execFile;

exports.c = async function (folder, dest){
    
    // EC - Check provided folder exists. 
    
    return new Promise((resolve, reject) => {
          execFile('zip', ['-r', '-j', folder, dest], function(err, stdout) {
        
    if(err){
        console.error('THE ZIP FILE SYSTEM HAS ENCOUNTERED AN ERROR - ', err); 
            reject(err); 
    }

    resolve();
});              
    
                
})
    
    
}; 