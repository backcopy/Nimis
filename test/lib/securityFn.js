const crypto = require('crypto');

// <== GENERATE RANDOM DATA ==> 
exports.randomDataGen = () => {
    return new Promise((resolve, reject) => {
          crypto.randomBytes(20, (err, buf) => {
            if (err) reject(err);
              let returnData = buf.toString('hex'); 
                  resolve(returnData); 
        });                                   
    }) 
}; 