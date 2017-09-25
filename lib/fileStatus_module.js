const fs = require('fs'); 

exports.c = async function (file){
    async function checkFileExists(){
        return new Promise((resolve, reject) => {
            fs.access(file, (err) => {
                if (err && err.code === 'ENOENT') {
                    reject('FAIL'); 
            } else {
                resolve('OK'); 
            }
        })
    }); 
};

    try {
        let fileStatus = await checkFileExists(); 
        
        // EC - Confirm fileStatus return value before returning. 
        if (fileStatus === 'OK' || fileStatus === 'FAIL'){
                return fileStatus; 
        } else {
            throw 'THE FILE STATUS MODULE HAS ENCOUNTERED A CRITICAL ERROR.';  
        }
    } catch(err){
        return err; 
    }
    
};

