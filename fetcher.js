// takes in URL as command-line argument and local file path
// download the resource to the specified path
// upon completion, print out a message saying Downloaded and saved x bytes to path

// use request library to make HTTP request
const request = require('request');

// use Node's fs module to write file
const fs = require('fs');

// need to use command-line arguments
const input = process.argv.slice(2);

// use readline
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const requestServer = function() {
  request(`${input[0]}`, (error, response, body) => {
    // if there is no error, proceed to download file
    if (response.statusCode >= 300) {
      // if the given URL results in an error or non-200 result
      // terminate the app and explain what went wrong
      // don't write response to the file
      console.log(`You encountered an error with status code ${response.statusCode}`)
      process.exit();
    } else if (!error) {
      fs.writeFile(input[1], body, () => {
        let stats = fs.statSync(`${input[1]}`);
        let filesize = stats.size;
        console.log(`Downloaded and saved ${filesize} bytes to ${input[1]}`)
        process.exit();
      })
    }
  })
};

const fetcher = function() {
  // first check if the path is valid
  let path = input[1];
  let pathArr = path.split("");
  let index = 0;
  let pathOnlyArr = [];
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i] === "/") {
      index = i;
    }
  }
  for (let i = 0; i <= index; i++) {
    pathOnlyArr.push(pathArr[i]);
  }
  let pathOnly = pathOnlyArr.join("");
  // could also have checked with fs.exists(path, callback)
  fs.stat(pathOnly, (err) => {
    // if no error i.e. valid path
    // check if the file already exists
  })
  fs.access(input[1], fs.constants.F_OK, (err) => {
    // file exists
    if (!err) {
      rl.question('The file already exists. If you would like to overwrite the file, type y and hit enter\n', (answer) => {
        if (answer = "y") {
          requestServer();
        }
      })
    } else {
      requestServer();
    }
  })
};

fetcher();
