const url = require('url'); 

const myURL = new URL('http://mywebsite.com/hello.html?id=100&status=active'); 

// Serialized URl 
console.log(myURL.href); 
console.log(myURL.toString()); 

// Host, Root Domain 
console.log(myURL.host); 

// Host Name, Does NOT Include Port 
console.log(myURL.hostname); 

// Path Name 
console.log(myURL.pathname); 

// Serialized Query 
console.log(myURL.search); 

// Parameter Object 
console.log(myURL.searchParams); 

// Add Parameters 
myURL.searchParams.append('abc', '123'); 
console.log(myURL.href); 

// Loop Through Parameters 
myURL.searchParams.forEach((value, name) => 
    console.log(`${name}: ${value}`)); 





