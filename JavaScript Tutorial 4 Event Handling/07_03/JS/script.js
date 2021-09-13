const CTA = document.querySelector(".cta a"); 
const ALERT = document.querySelector("#booking-alert"); 
// If JavaScript is not enabled, then the default is to hide 
// the Book Now button and display some alert 

CTA.classList.remove("hide"); 
ALERT.classList.add("hide"); 

function reveal(e, current) { 

    // Prevent the Default behavior of the button 
    e.preventDefault(); 

    if(current.innerHTML == "Book Now!") 
        CTA.innerHTML = "Clicked"; 

    //CTA.classList.toggle("hide"); 
    ALERT.classList.toggle("hide"); 

}

// Pass the event object into the reveal function 
CTA.onclick = reveal; 

// The second event handler overwrites the first 
// Can only assign one event handler 
CTA.onclick = console.log("The Button was clicked just now. "); 

// Event Listener 
// Modern approach for multiple event handlers 
CTA.addEventListener("click", function(e) { reveal(e, this) }, false); 
CTA.addEventListener("click", function() { console.log("The Button was clicked just now. "); }, false); 



