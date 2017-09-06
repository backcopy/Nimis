![main logo](https://i.imgur.com/5EBJAY7.png?raw=true "Main Logo")

Nimis is a barebones, highly versatile, NodeJS asynchronous backup utility with built-in secure hashing.

## Warning

This project is under development and should not in any way be used in a production environment. 

## Getting Started

Nimis is very barebones, containing only what's most needed and as such it naturally requires you to plug in most of your own application. 

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


## Execution

A regular Nimis call for 2 files. You're required to send an array of files names to Nimis - you must include the complete path. This is likely going to undergo some more development soon to fix a few potential bugs. 

```
nimis(['file1.js', 'file2.js'])
```

Nimis will then reply with the objects containing your intial files and zipped files  hashes. 

```
{ p0: 
   { initHash: 'ff02bf720337e6131690a2c21e3081bba6cd77cee140f0bf542318d59eabd3ad86bb072fe88157de59ed0ee616c0670b68c527163bc53d5843b5997707815bab',
     zipHash: '802af148962d5d48c81f2f334ea24d35b9bf62b6b0dbd02bd7c9ac7b797bba89e19bcb55652598c0956d0f0814c0d3e4de5671e98c61b5c978cb93b89a4b769c' },
  p1: 
   { initHash: 'f149014e4a8cdb231e4dd8dfdd4649135576d703b4da157b5ce95c68efbffc95601d4016e542666fc8a08920084d6e6caeecf7d9b1f036f4230c57c7d64b31f9',
     zipHash: 'c47c7163b0155b376ccb1da02d6145f547955cc9eeca0a385fafcbc161523b522f261f717251d0ed905a7a891d6fc69e56adf5fe7c5ec5bdcbd2c13039fae53b' } }
```
## Deployment

Due to the asynchronous nature of Nimis, your application must also be asynchronous and as such, must also execute nimis asynchronously. Failure to do so will result in critical errors. 

## Built With

* [NodeJS](https://nodejs.org/) - v8.4.0


## Contributing

Coming soon!

## Versioning

* v1.0.0 (current) 

## Authors

* **Edin Jusupovic** 


## License

Coming soon!

## Acknowledgments

Coming soon!
