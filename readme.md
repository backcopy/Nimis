![main logo](https://i.imgur.com/5EBJAY7.png?raw=true "Main Logo")

Nimis is a barebones, highly versatile, NodeJS asynchronous backup utility with built-in secure hashing.

## Getting Started

Nimis is highly versitle and lite, it naturally requires you to plug in most of your own application. 

### Prerequisites

Depedencies required for Nimis to function properly. 

```
1. NodeJS (8.4.0)
2. Linux OS (RHEL preffered)
```

### Installing

Installing the Nimis utility is quite simple, just pull a copy of this repository and intilize the npm package.

```
npm init 
```


## Running the tests

In this example, you would input the 'foo.js' file and Nimis would compress that file with gzip, outputting bar.gz in the selected directory. Please note that file extensions should not be used with the output file as it is automatically compressed.

```
backupFile('foo.js', 'bar');
```


## Deployment

Due to the way the hashing function is currently implmented via setTimeout() - you may wish to experiment with the stability aspect of it.

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
