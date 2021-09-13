// First Express Server
const express = require('express'); 
const path = require('path'); 
const logger = require('./middleware/logger'); 
const exphbs = require('express-handlebars'); 
const members = require('./Members'); 
const app = express(); 

// Initialize Middleware 
// app.use(logger); 

// Body Parser Middleware 
app.use(express.json()); 
// Handle Form Submissions 
app.use(express.urlencoded({ extended: false })); 

// HandleBars Middleware 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Homepage Route 
// This is above the Static Folder. Loads Index First. 
app.get('/', (req, res) => res.render('index', {
     title: 'Member App',
     members 

})); 


/*
Not an efficient method of routing pages. Would require manual routing per page. 

// Going to a page is a get() request. 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
}); 
*/

// Set Static Folder 
// Routes all page requests to the folder. 
// The CSS is in the public folder as well, so the HTML files are sent with the CSS. 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/api/members', require('./routes/api/members')); 

// The port will be defined by the Process Environment, but 5000 in development. 
const PORT = process.env.PORT || 5000; 

// The server listens to requests on the PORT. 
app.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT}`); 
}); 



