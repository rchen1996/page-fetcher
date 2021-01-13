// takes in URL as command-line argument and local file path
// download the resource to the specified path
// upon completion, print out a message saying Downloaded and saved x bytes to path

// use request library to make HTTP request
const request = require('request');

// use Node's fs module to write file
const fs = require('fs');

// need to use command-line arguments
const input = process.argv.slice(2);

const fetcher = function(url, path) {
  // first check if the path is valid
  fs.access(input[1], (err) => {
    // if no error i.e. valid path
    if (!err) {
      // make the request and write the file
      request(`${input[0]}`, (error, response, body) => {
        // if there is no error, proceed to download file
        if (!err) {
          fs.writeFile(input[1], body, () => {
            let stats = fs.statSync(`${input[1]}`);
            let filesize = stats.size;
            console.log(`Downloaded and saved ${filesize} bytes to ${input[1]}`)
          })
        } else {
          // if the given URL results in an error or non-200 result
          // terminate the app and explain what went wrong
          // don't write response to the file
          console.log(`You encountered an error with status code ${error}`)
        }
      })
    } else {
      // if path is not valid, fail the download
      console.log("This path is not valid!");
    }
  })
};

fetcher();
