// Path is a core module 
// The path variable is a reference to the module or class 
const path = require('path'); 

// Base File Name 
console.log(path.basename(__filename)); 

// Directory Name 
console.log(path.dirname(__filename)); 

// File Extension 
console.log(path.extname(__filename)); 

// Create Path Object 
// Can access any of the properties. 
console.log(path.parse(__filename)); 

// Concatenate Paths 
// ../test/hello.html 
// Takes care of path names in different Operating Systems differences 
console.log(path.join(__dirname, 'test', 'hello.html')); 

