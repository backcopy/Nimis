const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

let hash = require('./lib/hash_module.js').File; 
let zip = require('./lib/zip_module.js').File;
let uniqueFn = require('./lib/unique_module.js').uniqueFileNameGeneration;
let uniqueDir = require('./lib/unique_module.js').uniqueDirectoryNameGeneration;
let fileStat = require('./lib/fileStatus_module.js').c; 
let bindFiles = require('./lib/bind_module.js').c; 


// <=== BACKUP MODULE ===> 
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

// <=== BACKUP MODULE ===> 
 exports.backup = async function core(arrayOfFiles){
     
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
 
 
 
 
 
 
// <=== REBUILD MODULE ===> 

// Check integrity of zip file. 
 
// Unzip the main provided zip file. 
 
// Dump contents into %temp% folder for preview. 
 
// Match hash of .gz files. 
 
// Extract .gz files into another %temp% directory. 
 // 1. Delete .gz files from %temp% 
 
// Match initial hash of files. 
 
// Use FnI property to rebuild initial files into designated path. 
 

// <=== API ===> 
 
// Nimis(zipPath, objectData, returnPath)
 // zipPath = Path of zip file.
 // objectData = The nimis generated object. 
 // returnPath = Path where you wish to have the backup unload. 

// objectPath === 
 
//{ p0: 
//   { iHash: 'e7a555eb3f7c27327a21ae7e48a7481c9543efd68d7c92a080318acbfd4cae1cfa4d8fd3bcd05d3e51702f6f68112442a2ace378317cbd394a9a5bbf71714f42',
//     cHash: '286729de6406b8b5a5e1d800259e54a9ae7e198ad4c8a45468baf72300195c26723c0505c0a7e682ec8ec8374b8743778c295663a334607521fb76a24c6a6361',
//     FnI: 'package.json',
//     FnC: '82830dd28b38622a05efbef62346ebbf47f7b7b3.json.gz' }
//  COMPLETE: 
//   { hash: '86ce482199958e5cc0f2a3f2d1becbe269a28e106519c203e35ad5c13655d33f881f4dedb498481dea9b4ff1b3aa377d2f083210c6cb13a0543c6c0ee90123e1',
//     fileName: '0413cc052b1a2629fa4594605e05470a4674b30b.zip',
//     key: 'e3862a0a8a6c2aa9c57228157501bc59b1da14e6e214797fe3fb5a63e5c3' } } 
 
