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
            return fileStatus; 
    } catch(err){
        return 'FAIL'
    }
    
}