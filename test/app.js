const fs = require('fs'); 
const crypto = require('crypto');

const assert = require('chai').assert; 
const expect = require('chai').expect;

let fileStat = require('../lib/fileStatus_module.js').c; 
let hash = require('../lib/hash_module.js').File; 
let zip = require('../lib/zip_module.js').File;
let bindFiles = require('../lib/bind_module.js').c; 

let nimis = require('../nimis.js').backup; 

// <== GENERATE RANDOM DATA ==> 
let randomDataGen = () => {
    return new Promise((resolve, reject) => {
          crypto.randomBytes(20, (err, buf) => {
            if (err) reject(err);
              let returnData = buf.toString('hex'); 
                  resolve(returnData); 
        });                                   
    }) 
}; 


// <== CREATE NEW FILE ==> 
let createFile = (fileName = "nimisTestFile.txt") => {
    return new Promise((resolve, reject) => {
        let stream = fs.createWriteStream(fileName);
        stream.once('open', (fd) => {
            stream.write("FOO_BAR");
                stream.end(resolve());
        });
    })  
}


// <== DELETE FILE ==> 
let deleteFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.unlink(fileName, (err) => {
            if (err) throw err;
                resolve();
        });
    })
}; 


describe('Nimis', () =>{
    
it('Verify nimis initial file integrity checking. [NDY]', async () => {

    
});
    
it('Verify nimis gzip file integrity checking. [NDY]', async () => {
        
});

    
it('Verify Nimis with multiple randomized files. [NDY]', async () => {
        
});
    
it('Verify key provided to return object. [NDY]', async () => {
        
});
  
});

describe('Nimis | Return object data structure', () =>{
    
before(async () =>{
 createFile('backups/exampleFile01.txt'); 
 createFile('backups/exampleFile02.txt');    
})
    
after(async () => {
    let result1 = await deleteFile('backups/exampleFile01.txt'); 
    let result2 = await deleteFile('backups/exampleFile02.txt');

})
    

it('iHash', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt'])
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
        expect(result.p0.FnI).to.be.an('string');
    
})


it('cHash', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt'])
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
        expect(result.p1.cHash).to.be.an('string');
})


it('FnC', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt'])
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
        expect(result.p0.FnC).to.be.an('string')
})



it('FnI', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt']);
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
    expect(result.p0.FnI).to.equal('backups/exampleFile01.txt')   
    })
 
it('COMPLETE object', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt'])
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
        expect(result.COMPLETE).to.be.an('object');
    })
    
it('COMPLETE.hash', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt'])
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
        expect(result.COMPLETE.hash).to.be.an('string'); 
    })
    
it('COMPLETE.fileName', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt'])
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
        expect(result.COMPLETE.fileName).to.be.an('string');
    })
    
it('COMPLETE.key', async() => {
    let result = await nimis(['backups/exampleFile01.txt', 'backups/exampleFile02.txt'])
        await deleteFile(`backups/${result.COMPLETE.fileName}`); // delete output zip for cleanup purposes.
    
        expect(result.COMPLETE.key).to.be.an('string');
    })
}); 


describe('Environment System', () =>{
    it('Check for working zip utility. [NDY]', async () => {
        // HERE
});
    

});


describe('Security System', () =>{
    it('Generate random data for Nimis.', async () => {

const result = await randomDataGen(); 
        
    // Set as 40 as randomBytes inputs bytes, not length. 
    expect(result).to.have.lengthOf(40);           
});
    

}); 

describe('File System', () =>{
    
after( async() =>{
    await deleteFile('nimisTestFile.txt'); 
})
    
it('Check /backups/ directory exists.', async () => {
        let result = await fileStat('backups/'); 
            expect(result).to.equal('OK');
        
});
    
it('Check file system is correctly reporting non-existant directories.', async () => {
        let result = await fileStat('thisDirectoryDoesNotExist/'); 
            expect(result).to.equal('FAIL');
        
});
    
it('Check file system is correctly reporting non-existant files.', async () => {
        let result = await fileStat('thisFileDoesNotExistAndCannotExist.txt'); 
            expect(result).to.equal('FAIL');
        
});

it('Create new test file.', async () => {
        await createFile(); 
        
        let result = await fileStat('nimisTestFile.txt');
        
        expect(result).to.equal('OK');
});
    
it('Check hash of test file.', async () =>{
        let resultResolve = '1f0c0cb402158307365d9f21f203ee3a5373c232850e49315acc4cfc8b5b3ea59437bc4b9ba00b360f3925c46da99f6984355e469ad52037a80aa266692738ff'; 
        
        let testFileHash = await hash('nimisTestFile.txt'); 
        
        expect(testFileHash).to.equal(resultResolve);
    });
}); 

describe('Gzip System', () =>{
    
after( async() =>{
   await deleteFile('nimisTestFile.txt'); 
   await deleteFile('nimisTestFileGzip.txt.gz'); 
})

it('Check gzip functionality with test file.', async () => {
        await createFile(); 
        let ext = await zip('nimisTestFile.txt', `nimisTestFileGzip`);
        
        let result = await fileStat('nimisTestFileGzip.txt.gz');
        
        expect(result).to.equal('OK');
        
}); 
    
it('Check gzip file integrity.', async () => {
    let resultResolve = 'b15ffbe648494b8c03fd0699e458a6f6bb385d8895432fc1997e50b16ae57dcfe4b3a7e80833a5365aa8dd2246adf14866431e844c90ebe919e73e354c349133';
    
    let gzipFileHash = await hash('nimisTestFileGzip.txt.gz'); 

    
    expect(resultResolve).to.equal(gzipFileHash);
}); 
}); 

describe('Zip System', () =>{
    
after( async() =>{
    await deleteFile('nimisTestFile1.txt');
    await deleteFile('nimisTestFileGzip1.txt.gz'); 
    await deleteFile('backups/zipTest1.zip'); 
})

it('Create new test file.', async () => {
    await createFile('nimisTestFile1.txt');
        let result = await fileStat('nimisTestFile1.txt');
        
        expect(result).to.equal('OK');
});
    
it('Gzip and compress new test file.', async () => {
    let ext = await zip('nimisTestFile1.txt', `nimisTestFileGzip1`);
        let result = await fileStat('nimisTestFileGzip1.txt.gz');
        
        expect(result).to.equal('OK');
});
    

it('Zip new test gzip file.', async () => {
  let outputSecureKey = await bindFiles(`backups/zipTest1.zip`, 'nimisTestFileGzip1.txt.gz');    
    
    let result = await fileStat('backups/zipTest1.zip');
    
    expect(result).to.equal('OK');
});
  
it('Check zip file integrity. [NDY]', async () => {
    // NOT POSSIBLE WITHOUT THE REBUILD SYSTEM. 
});
    
}); 




