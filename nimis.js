const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

let hash = require('./lib/hash_module.js').File; 
let zip = require('./lib/zip_module.js').File;
let uniqueFn = require('./lib/unique_module.js').uniqueFileNameGeneration;
let uniqueDir = require('./lib/unique_module.js').uniqueDirectoryNameGeneration;
let fileStat = require('./lib/fileStatus_module.js').c; 
let bindFiles = require('./lib/bind_module.js').c; 


async function main(file, dir){
    
    try {
        let hashInit = await hash(file);
        let uniqueFileName = await uniqueFn(); 
            await zip(file, `${dir}/${uniqueFileName}.gz`);
        
        
        let hashZip = await hash(`${dir}/${uniqueFileName}.gz`);
        
        return {
            initialNormalHash: hashInit, 
            zipFileHash: hashZip,
            zipFileName: uniqueFileName
        }
   
    } catch(err){
        throw new Error(err);
    }
    
}


 exports.call = async function core(arrayOfFiles){
     
    try{
        objectHolder = {};
        let tempDir = await uniqueDir(); 
        let finalName = await uniqueFn();
        let initArray = arrayOfFiles; 

            for (let i=0; i<initArray.length;i++){
                
                let fileStatus = await fileStat(initArray[i]);
                    
                
                    if (fileStatus === 'OK'){
                    let returnData = await main(initArray[i], tempDir);
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
        
        await bindFiles(tempDir, `backups/${finalName}.gz`); // Combine all files
        let bindZip = await hash(`backups/${finalName}.gz`);
        
        objectHolder['COMPLETE_GZIP'] = {
             hash: bindZip,
             fileName: `${finalName}.gz`
        }
        return objectHolder // OBJECT RETURNED HERE  
        
    } catch(err){
        throw new Error(err);
    }
}

