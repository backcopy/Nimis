const fs = require('fs'); 

exports.c = async function (file){
    async function checkFileExists(){
        return new Promise((resolve, reject) => {
            fs.access(file, (err) => {
                if (err && err.code === 'ENOENT') {
                    reject('FAIL'); 
            } else {
                // EC - Confirm file data to ensure it actually exists. 
                resolve('OK'); 
            }
        })
    }); 
};

    try {
        let fileStatus = await checkFileExists(); 
        
        // EC - Confirm fileStatus return value before returning. 
            return fileStatus; 
    } catch(err){
        return ERR;
    }
    
}