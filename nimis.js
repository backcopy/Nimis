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
        let ext = await zip(file, `${dir}/${uniqueFileName}`);
        let hashGz = await hash(`${dir}/${uniqueFileName}${ext}.gz`);
        
        // EC - Check return objects objects integrity
        if (hashInit && hashGz && uniqueFileName){
            return {
            initialNormalHash: hashInit, 
            GzFileHash: hashGz,
            GzFileName: `${uniqueFileName}${ext}.gz`
        }
        }
        
   
    } catch(err){
        throw err;
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
        
        let objectHolderAmount = 0; // track how many file objects 
        let objectHolderFileNotFound = 0; // track how many files not found 
        
            for (let i=0; i<initArray.length;i++){
                
                let fileStatus = await fileStat(initArray[i]);
                
                
                    if (fileStatus === 'OK'){
                        objectHolderAmount++; 
                    let returnData = await main(initArray[i], tempDir);
                    let currentPosition = `p${[i]}`;
             objectHolder[currentPosition] = {
             iHash: returnData.initialNormalHash, // Intial file uncompressed, hash. 
             cHash: returnData.GzFileHash, // Individual file, compressed. 
             FnI: initArray[i], // Individual file name, uncompressed. 
             FnC: returnData.GzFileName // Individual file name, compressed.
        };  
        } else if (fileStatus === 'FAIL'){
            objectHolderAmount++;
                objectHolderFileNotFound++; 
            
                    let currentPosition = `p${[i]}`;
            objectHolder[currentPosition] = {
             error: 'FILE NOT FOUND'
        }
        }
        // EC - Check integrity of fileStatus OK/FAIL
    }
       // EC - Check if all files provided do not exist, make sure Nimis
       // halts execution to avoid attempting to zip an empty input. 
       
       if (objectHolderAmount === objectHolderFileNotFound){
           throw 'CANNOT FIND ANY FILES TO PREPARE.'
       }
        
        // EC - Check to ensure tempDir data exists
        let tempDirStatus = await fileStat(tempDir);
            if (tempDirStatus === 'FAIL'){
                throw 'UNABLE TO LOCATE TEMPORARY DIRECTORY.'; 
            }

        // EC - Check to ensure /backups/ directory exists
        let backupDirStatus = await fileStat('backups/'); 
            if (backupDirStatus === 'FAIL'){
                throw 'NIMIS COULD NOT LOCATE THE /BACKUPS/ DIRECTORY.';
            } else if (backupDirStatus === 'OK') {
                
                // Bind files and return key to outputSecureKey
                let outputSecureKey = await bindFiles(`backups/${finalName}.zip`, tempDir)
                    let bindZip = await hash(`backups/${finalName}.zip`);
        
        objectHolder['COMPLETE'] = {
             hash: bindZip,
             fileName: `${finalName}.zip`,
             key: outputSecureKey
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
        throw err;
    }
}

