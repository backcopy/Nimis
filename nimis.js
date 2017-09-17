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
        // <== EC CHECKS ==> 
            // 1. Check hash. 
            // 2. Check produced file name. 
            // 3. Check ext data. 
            // 4. Check returned hashZip data. 
        let hashInit = await hash(file);
        let uniqueFileName = await uniqueFn(); 
        let ext = await zip(file, `${dir}/${uniqueFileName}`);
        let hashZip = await hash(`${dir}/${uniqueFileName}${ext}.gz`);
        
        // EC - Check return objects objects integrity
        return {
            initialNormalHash: hashInit, 
            zipFileHash: hashZip,
            zipFileName: `${uniqueFileName}${ext}.gz`
        }
   
    } catch(err){
        console.error(err);
    }
    
}


 exports.call = async function core(arrayOfFiles){
     
    try{
        objectHolder = {};
        
        // <== EC CHECKS ==> 
            // 1. Check data provided by tempDir. 
            // 2. Check finalName data. 
            // 3. Check initArray to confirm array data. 
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
        // EC - Check integrity of fileStatus OK/FAIL
    }
       // EC - Check if all files provided do not exist, make sure Nimis
       // halts execution to avoid attempting to zip an empty input. 
        
        // EC - Check to ensure tempDir data exists
        let tempDirStatus = await fileStat(tempDir);
            if (tempDirStatus === 'FAIL'){
                throw 'UNABLE TO LOCATE TEMPORARY DIRECTORY'; 
            }

        // EC - Check to ensure /backups/ directory exists
        let backupDirStatus = await fileStat('backups/'); 
            if (backupDirStatus === 'FAIL'){
                throw ('NIMIS COULD NOT LOCATE THE /BACKUPS/ DIRECTORY.');
            } else if (backupDirStatus === 'OK') {
                await bindFiles(`backups/${finalName}.zip`, tempDir)
                    let bindZip = await hash(`backups/${finalName}.zip`);
        
        objectHolder['COMPLETE'] = {
             hash: bindZip,
             fileName: `${finalName}.zip`
        }
        
        // EC - Check to ensure objectHolder data isn't empty 
        // or invalid.
            if (objectHolder.p0 && objectHolder.COMPLETE){
                return objectHolder // OBJECT RETURNED HERE  
            } else {
                throw 'MALFORMED OBJECT HOLDER.';
            }
        }
        
    } catch(err){
        console.error(err);
    }
}

