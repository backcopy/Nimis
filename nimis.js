const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

let hash = require('./lib/hash_module.js').File; 
let zip = require('./lib/zip_module.js').File;
let uniqueFn = require('./lib/unique_module.js').c;
let fileStat = require('./lib/fileStatus_module.js').c; 

async function main(file){
    try {
        let hashInit = await hash(file);
        let uniqueFileName = await uniqueFn(); 
            await zip(file, uniqueFileName);
        let hashZip = await hash(`backups/${uniqueFileName}.gz`);
        
        return {
            initialNormalHash: hashInit, 
            zipFileHash: hashZip,
            zipFileName: uniqueFileName
        }
   
    } catch(err){
        throw new Error(err);
    }
    
}


exports.call = async function (arrayOfFiles){
    try{
        objectHolder = {};
        
        let initArray = arrayOfFiles; 

            for (let i=0; i<initArray.length;i++){
                let fileStatus = await fileStat(initArray[i]);
                
                    if (fileStatus === 'OK'){
                    let returnData = await main(initArray[i]);
                    let currentPosition = `p${[i]}`;
             objectHolder[currentPosition] = {
             initHash: returnData.initialNormalHash,
             zipHash: returnData.zipFileHash,
             fileName: returnData.zipFileName
        };  
        } else if (fileStatus === 'FAIL'){
        
                    let currentPosition = `p${[i]}`;
            objectHolder[currentPosition] = {
             error: 'FILE NOT FOUND'
        }
        }            
    }
        
     
        return objectHolder // OBJECT RETURNED HERE  
    } catch(err){
        throw new Error(err);
    }
}


