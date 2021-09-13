const fs = require('fs'); 
const path = require('path'); 

// Create Folder 
// This is an asynchronous method which has a CallBack function parameter 
// The override synchronous version does not require CallBack function 
/*
fs.mkdir(path.join(__dirname, 'test'), {}, err => {
    if(err) throw err; 
    console.log('Folder Created'); 
}); 
*/

// Create and Write to File 
// Write File Overwrites 
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 
    'Hello there ', 
    err => {
        if(err) throw err; 
        console.log('File Created'); 
    } 
); 

// Append File Extends 
fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), 
    'I love Node.js', 
    err => {
        if(err) throw err; 
        console.log('File Created'); 
    } 
); 

// Read File 
fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 
    'utf8', 
    (err, data) => {
        if(err) throw err; 
        console.log(data); 
    } 
); 

// Rename File 
fs.rename(path.join(__dirname, '/test', 'hello.txt'), 
    path.join(__dirname, '/test', 'hellothere.txt'), 
    err => {
        if(err) throw err; 
        console.log('File Renamed'); 
    } 
); 



