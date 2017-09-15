const execFile = require('child_process').execFile;

exports.c = async function (folder, dest){
    return new Promise((resolve, reject) => {
          execFile('tar', ['-c', '-v', '-f', dest, '-C', folder, '.'], function(err, stdout) {
        
    if(err){
        reject(err); 
    }

    resolve();
});              
    
                
})
    
    
}; 
