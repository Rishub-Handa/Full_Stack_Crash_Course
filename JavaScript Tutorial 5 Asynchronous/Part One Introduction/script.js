console.log("Hi"); 

// setTimeout is an asynchronous function. 
// The CallBack function is called immediately after the asynchronous function 
setTimeout(function() {
    console.log("Asynchronous Result. "); 
}, 5000); 

console.log("Synchronous Result. "); 
