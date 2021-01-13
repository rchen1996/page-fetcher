// takes in URL as command-line argument and local file path
// download the resource to the specified path
// upon completion, print out a message saying Downloaded and saved x bytes to path

// use request library to make HTTP request
const request = require('request');

// use Node's fs module to write file
const fs = require('fs');

// need to use command-line arguments
const stdin = process.stdin;

// setup stdin
stdin.setRawMode(true);
stdin.setEncoding('utf8');

