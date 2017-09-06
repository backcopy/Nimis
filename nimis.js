const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

nimis(['app.js', 'example1.js']);

async function main(file){
    try {
        let hashInit = await grabHash(file); 
            await zipFile(file);
        let hashZip = await grabHash(`backups/${file}.gz`);
        
        return {
            initialNormalHash: hashInit, 
            zipFileHash: hashZip
        }

        
        
    } catch(err){
        throw new Error(err);
    }
    
}

async function nimis(arrayOfFiles){
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
        console.log(objectHolder); // OBJECT RETURNED HERE !! 
    } catch(err){
        throw new Error(err);
    }
}


async function grabHash(fileLocation){
    let hash = crypto.createHash('sha512');
    let stream = fs.createReadStream(fileLocation);
    
    return new Promise((resolve, reject) => {
        stream.on('error', err => reject(err));
            stream.on('data', chunk => hash.update(chunk));
                stream.on('end', () => {
                    resolve(hash.digest('hex'));
    })
        
    })
}; 


async function zipFile(fileInfo){
    var gzip = zlib.createGzip({
    level: 9}), 
    buffers=[], 
    nread=0;

    return new Promise((resolve, reject) => {
        let r = fs.createReadStream(fileInfo); // Input file 
        let w = fs.createWriteStream(`backups/${fileInfo}.gz`); // Output file 
            let compressEvent = r.pipe(gzip).pipe(w);
        
       compressEvent.on('error', (error) => {
           reject(error); 
       })
        
       compressEvent.on('finish', () => {
        resolve();   
       });                
})       
}



