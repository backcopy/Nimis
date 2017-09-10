const fs = require('fs');
const crypto = require('crypto'); 
const zlib = require('zlib');

exports.File = async function (fileInfo, outputInfo){
    var gzip = zlib.createGzip({
    level: 9}), 
    buffers=[], 
    nread=0;

    return new Promise((resolve, reject) => {
        let r = fs.createReadStream(fileInfo); // Input file 
        let w = fs.createWriteStream(`backups/${outputInfo}.gz`); // Output file 
            let compressEvent = r.pipe(gzip).pipe(w);
        
       compressEvent.on('error', (error) => {
           reject(error); 
       })
        
       compressEvent.on('finish', () => {
        resolve();   
       });                
})       
}; 

