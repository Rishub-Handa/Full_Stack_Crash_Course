// add global variable containing XHR object here
let httpRequest = new XMLHttpRequest(); 

// add get() function here


/*

Rewrite With Promises 
function get(url, success, fail) { // If the HTTP Request returns data, call success, otherwise, call fail. 
    httpRequest.open('GET', url); 
    httpRequest.onload = function() {
        if(httpRequest.status === 200) {
            success(httpRequest.responseText); // Success handler set up as CallBack function waits for HTTP Response. 
        } else {
            fail(httpRequest.status); 
        }
    }

    httpRequest.send(); 
}

*/ 

// Get Using Promises 
function get(url) { 
    console.log("URL Called"); 
    return new Promise(function(resolve, reject) {
        httpRequest.open('GET', url); 
        httpRequest.onload = function() {
            if(httpRequest.status === 200) {
                console.log("Got Request"); 
                // This parameter is passed to the then function in the Promise. 
                resolve(httpRequest.responseText); // Success handler set up as CallBack function waits for HTTP Response. 
            } else {
                console.log("Did not get request"); 

                // This parameter is passed to the catch function in the Promise. 
                reject(Error(httpRequest.status)); // Generate an Error Object to disply the console. 
            }
        }

        // httpRequest.onerror = function() {
        //     reject(Error('Network Error')); 
        // }; 

        httpRequest.send(); 
    }); 
}

function tempToF(kelvin) {
    return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

function successHandler(data) {
    const dataObj = JSON.parse(data);
    const weatherDiv = document.querySelector('#weather');
    const div = `
        <h2 class="top">
        <img
            src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
            alt="${dataObj.weather[0].description}"
            width="50"
            height="50"
        />${dataObj.name}
        </h2>
        <p>
        <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${dataObj.weather[0].description}
        </p>
    `
    return div; 
    // weatherDiv.innerHTML = weatherFragment;
}

function failHandler(status) {
    console.log(status); 

}

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'd03a593d18bd71de000c7b06c17e9369';
    const weatherDiv = document.querySelector('#weather');

    const locations = [
        'los+angeles,us', 
        'san+francisco,us', 
        'lone+pine,us', 
        'mariposa,us'
    ]; 

    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' + apiKey;
    const urls = locations.map(function(location) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`; 
    }); 
    
    console.log("Here"); 
    // add get() function call here
    // get(url, successHandler, failHandler); 
    // successHandler(httpRequest.responseText); Calls the success handler before waiting for HTTP response. 
    
    // Returns a Promise Object 
    // then() receives parameter from the resolve function. 
    // catch() receives parameter from the reject function. 
    // finally() always executes 
    /*

    Handle many promises 

    Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
        .then(function(responses) {
            // successHandler(response) creates an HTML template literal. 
            // then() returns an array of template literals. 
            // This is passed down to the next then() or finally(). 
            console.log("First Then"); 
            return responses.map(function(response) {
                return successHandler(response); 
            }); 
        })
        .then(function(literals) {
            // join() concatenates the HTML of the template literals. 
            // Add HTML elements to the page. 
            console.log("Second Then"); 
            weatherDiv.innerHTML = `<h1>Weather<h1>${literals.join('')}`; 
        })
        .catch(function(status) {
            console.log("Catch"); 
            failHandler(status); 
        })
        .finally(function() {
            console.log("Finally"); 
            weatherDiv.classList.remove('hidden');
        });  
        */

        // Rewrite with Async and Await 
        // The () around the function have it immediately invoked without calling. 
        (async function() {
            // Try catch statement is similar to Vanilla JavaScript. 
            try {
                // Begins synchronously 
                let responses = []; 
                // Wait for the get() to finish before pushing to responses 
                // All statements run in parallel, or asynchronously 
                for(let i = 0; i < urls.length; i++) {
                    responses.push(await get(urls[i])); 
                } 
                // Contains HTML 
                // Code waits for the asynchronously scheduled threads to join, then program resumes. 
                let literals = responses.map(function(response) {
                    return successHandler(response); 
                }); 
                weatherDiv.innerHTML = `<h1>Weather<h1>${literals.join('')}`;
            } 
            catch (status) {
                failHandler(status); 
            }
            finally {
                weatherDiv.classList.remove('hidden');
            }
            
        })(); 

});
