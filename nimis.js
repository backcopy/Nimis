const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

let hash = require('./lib/hash_module.js'); 
let zip = require('./lib/zip_module.js');


async function main(file){
    try {
        let hashInit = await hash.File(file); 
            await zip.File(file);
        let hashZip = await hash.File(`backups/${file}.gz`);
        
        return {
            initialNormalHash: hashInit, 
            zipFileHash: hashZip
        }

        
        
    } catch(err){
        throw new Error(err);
    }
    
}


exports.c = async function (arrayOfFiles){
    try{
        objectHolder = {};         
        let initArray = arrayOfFiles; 
            for (let i=0; i<initArray.length;i++){
                let returnData = await main(initArray[i]);
                    let currentPosition = `p${[i]}`;
             objectHolder[currentPosition] = {
             initHash: returnData.initialNormalHash,
             zipHash: returnData.zipFileHash
        };   
    }
        return objectHolder // OBJECT RETURNED HERE  
    } catch(err){
        throw new Error(err);
    }
}


