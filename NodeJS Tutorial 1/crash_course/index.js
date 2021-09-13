/*

Initial Example 

console.log('Hello from NodeJS'); 
// Have access to exports, require, __dirname, and __filename

// Bring in the person class 
// Similar to import Person from './person'; 
const Person = require('./person')

const person1 = new Person('John Doe', 30); 
person1.greeting(); 

*/ 

// Logger Example 
/*
const Logger = require('./logger'); 

const logger = new Logger(); 
logger.on('message', (data) => console.log('Called Listener:', data)); 
// The emit() in log() calls on(). 
logger.log('Hello There'); 
logger.log('Hello There'); 
logger.log('Hello There'); 
*/

const http = require('http'); 
const path = require('path'); 
const fs = require('fs'); 


/* 
Inefficient Methods 

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if(err) throw err; 
            res.writeHead(200, { 'Content-Type': 'text/html' }); 
            res.end(content);
        });  
        
    }

    if(req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if(err) throw err; 
            res.writeHead(200, { 'Content-Type': 'text/html' }); 
            res.end(content);
        });  
        
    } 

    if(req.url === '/api/users') {
        const users = [
            { name: 'Bob Smith', age: 35 }, 
            { name: 'John Doe', age: 25 } 
        ]; 
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify(users)); 
    }

    console.log(req.url);

}); 


*/ 

const server = http.createServer((req, res) => {
    // Build File Path 
    let filePath = path.join(__dirname, 
        'public', 
        req.url === '/' ? 'index.html' : req.url
    ); 

    // Extension of File 
    const extName = path.extname(filePath); 
    
    // Initial Content Type 
    let contentType = 'text/html'; 

    // Check the extension and set the content type. 
    switch(extName) {
        case '.js': 
            contentType = 'text/javascript'; 
            break; 
        case '.css': 
            contentType = 'text/css'; 
            break; 
        case '.json': 
            contentType = 'application/json'; 
            break; 
        case '.png': 
            contentType = 'image/png'; 
            break; 
        case '.jpg': 
            contentType = 'image/jpg'; 
            break; 
    }

    // Read File 
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                // Page Not Found 
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' }); 
                    res.end(content, 'utf8');  
                }); 
            } else {
                // All Other Errors 
                res.writeHead(500); 
                res.end(`Server Error ${err.code}`); 
            }
        } else {
            // Successful 
            res.writeHead(200, { 'Content-Type': contentType }); 
            res.end(content, 'utf8'); 
        }
    }); 

}); 


// First check the process environment for a port 
// If the value does not exist, use port 5000 
const PORT = process.env.port || 5000; 

server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)); 




