![main logo](https://i.imgur.com/5EBJAY7.png?raw=true "Main Logo")

Nimis is a barebones, highly versatile, NodeJS asynchronous backup utility with built-in secure hashing.

## Warning

This project is under development and should not in any way be used in a production environment. 

## Getting Started

Nimis contains only what's most needed and as such it naturally requires you to plug in most of your own application. Feel free to modify it in order to suit your needs. 

### Prerequisites

Depedencies required for Nimis to function properly. 

```
1. NodeJS (8.4.0)
```

### Installing

Installing the Nimis utility is quite simple, just pull a copy of this repository and intilize the npm package.

```
npm init 
```

The default backup directory for Nimis is /backups/ - you must ensure that this directory exists or you must specify your own directory. 

## Execution

#### Nimis initialization

```
let nimis = require('./nimis.js').call; 
```

#### Nimis example

You're required to send an array of file names to Nimis - you must include the complete path. This is likely going to undergo some more development soon to fix a few potential bugs. 

```
nimis(['file1.js', 'file2.js'])
```

#### Nimis reply 
Nimis will then reply with the objects containing your hashes. Both the initial file and the compressed file hashes will be provided, along with the output file name - which is uniquely generated by Nimis. 


`initHash`


The initHash object contains your initial hash, this is the hash of the initial file provided to Nimis, which can later be used to ensure that the compressed version contains the correct file. 


`zipHash`


The zipHash object contains your compressed/zipped file hash.


`fileName`


The fileName object contains the zipped/compressed file name. This is uniquely generated by Nimis and stored in the /backups/ directory. Please note that all file extensions are removed, including the .gz extension (in the fileName object returned by Nimis) however, your file will still contain both the intial file extension and the .gz extension.

TO DO: Build file extension preservation module.

```
{ p0: 
   { initHash: '328e2ee220a9de98d5b0848ec465115d2222436b0307ac91248b781767e3c83cdd1deb1ba1ee8ce44255945c3c6506d600ba86fc83ac2a69d681b795c714029a',
     zipHash: '0a7fa4dd16bd407fa8ddba5ce7296f303c150faa7f7424e9d8f817247c63ab59fa0feee125165e1472efa849f91b081050b06e98a73b7c79e705aeb0bcee34a4',
     fileName: '4a4214c4ffe3a3f0a38e90a7cc984110c482cccf' },
  p1: 
   { initHash: 'e7a555eb3f7c27327a21ae7e48a7481c9543efd68d7c92a080318acbfd4cae1cfa4d8fd3bcd05d3e51702f6f68112442a2ace378317cbd394a9a5bbf71714f42',
     zipHash: '286729de6406b8b5a5e1d800259e54a9ae7e198ad4c8a45468baf72300195c26723c0505c0a7e682ec8ec8374b8743778c295663a334607521fb76a24c6a6361',
     fileName: 'b3f18d7db682747263b688b433d35f927d3a02e3' },
  COMPLETE_GZIP: 
   { hash: 'dcc93967d9141ec34fb6cdfc547df6c7e82ae9f2fa17e9b7f9daff606396a848ff7c2767991ec487df4c4ba5b93937938f67889f3a731f6f61be356f420b5492',
     fileName: 'e1b7e6ea7665efc6155879a4d2433edd123dbcce.gz' } }
```

As you can see, multiple files can be sent as an array. Nimis will return objects, such as p0, p1, p2 and so forth, based on the files provided to Nimis. 


`COMPLETE_GZIP` 

Once your files have been hashed, compressed and hashed again, Nimis will then compress the provided folders into one main gzip file. The `COMPLETE_GZIP` object also contains the `hash` which is the hashed final gzip and the `fileName` object property, which contains the file name. 

These are both currently stored in the /backups/ directory. 

TO DO: Build config setup utility to pre-define directory. 

#### Errors

Here is an example of an error where 1/2 of the files sent to Nimis did not exist.

```
{ p0: 
   { initHash: '2925c55901ce543ef19c9d65c66c371bd98ff0f5ff13ec06fb7c0c2be6af376e1dda9546483cb405ba8d54a033035230245904d1bb143b474bbfb0388e6a6144',
     zipHash: '3c888c91dc0fbd02529104abe31437c73acd572706c1db464e236f0ea0b3ab84b99d1776c2eb58eb54b49fb52c354d2ef1d5ef69df290ef17075dde89f781e77',
     fileName: '0a6d3976cf5476e5dd200e11f50987d7431d3ca9' },
  p1: { error: 'FILE NOT FOUND' },
  COMPLETE_GZIP: 
   { hash: 'f661de99dd64994030d8cc69297ea0b913aa2ca11ede85d2f727bd456c870d80f2536d35007ad7e32b167708bba5f4e084c578b1c9c057b3d42858a2979a545a',
     fileName: '95b72ea1fecb759a83ed7fb2436caffa6dab7ae6.gz' } }
```


#### Asynchronous execution
Below is an example of how to asynchronously execute Nimis. 

```
let nimis = require('./nimis.js').call; 

async function foo(){
   try{
       let bar = await nimis(['readme.md']); 
        console.log(bar);
       
   } catch(err){
       throw new Error(err); 
   }
    
}; 

foo();
```

## Technical 

A preview of the technical inner workings of Nimis. 

#### Pre Hash Stage 

Nimis will take the intial file provided and hash it. 

#### Compression Stage 

Nimis will take the intial file and compress it using gzip with level 9 compression.

#### Post Hash Stage 

Nimis will then hash the compressed (gzip) file. 

#### Bind Stage 

If Nimis has been provided multiple files, it will bind all those files into one main gzip, for easier storage. 

#### Bind Hashing Stage 

Nimis will then hash the binded files and provide it back to you as the `COMPLETE_GZIP` property, containing the `hash` property and the `fileName` property. 


## Deployment

Due to the asynchronous nature of Nimis, your application must also be asynchronous and as such, must also execute nimis asynchronously. Failure to do so will result in critical errors. 


## To do list

```
1. Do more error checking. 

```

## Versioning

* v1.0.0 (current) 

## Authors

* **Edin Jusupovic** 


## License

Coming soon!


