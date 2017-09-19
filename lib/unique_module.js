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
              let tempFn = buf.toString('hex'); 
              if (tempFn.length < 20){
                  throw ('UNIQUE FILE NAME MODULE WAS UNABLE TO GENERATE NAME.')
              } else {
                  resolve(tempFn); 
              }
    
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
        
        
    }) 
};

exports.passwordGenerate = async function uniqueId(){
    return new Promise((resolve, reject) => {
          crypto.randomBytes(30, (err, buf) => {
            if (err) reject(err);
              // EC - Check the returned value. 
              let tempPw = buf.toString('hex'); 
              if (tempPw.length < 30){
                  throw ('UNIQUE FILE NAME MODULE WAS UNABLE TO GENERATE PASSWORD.')
              } else {
                  resolve(tempPw); 
              }
    
        });                                   
    })  
};  

