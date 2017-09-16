const crypto = require('crypto'); 
const fs = require('fs');
const os = require('os');
const { sep } = require('path');

const temporaryDes = os.tmpdir();



exports.uniqueFileNameGeneration = async function uniqueId(){
    return new Promise((resolve, reject) => {
          crypto.randomBytes(20, (err, buf) => {
            if (err) reject(err);
              // EC - Check the returned value. 
    resolve(buf.toString('hex')); 
        });                                   
    })  
};  

exports.uniqueDirectoryNameGeneration = async function uniqueDir(){
    return new Promise((resolve, reject) => {
        fs.mkdtemp(`${temporaryDes}${sep}`, (err, folder) => {
            if (err) {
                reject(err);
            }
            
           // EC - Check the returned value.
            resolve(folder); 
  });
        
        
    }); 
}