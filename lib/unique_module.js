const crypto = require('crypto'); 

exports.c = async function uniqueId(){
    return new Promise((resolve, reject) => {
          crypto.randomBytes(20, (err, buf) => {
            if (err) reject(err);
    resolve(buf.toString('hex')); 
        });                                   
    })  
};  

