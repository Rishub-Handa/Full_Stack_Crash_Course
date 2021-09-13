const http = require('http'); 

// Create Server Object 
http.createServer((req, res) => {
    // Write Response 
    res.write('Hello There'); 
    res.end(); 

}).listen(5000, () => {
    console.log('Server Running'); 
}); 