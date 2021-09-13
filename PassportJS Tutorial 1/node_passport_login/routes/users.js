const express = require('express'); 
const router = express.Router(); 
const bcrypt = require('bcryptjs'); 
const passport = require('passport'); 

// User Model 
const User = require('../models/User'); 

router.get('/login', (req, res) => {
    res.render('login');
}); 

router.get('/register', (req, res) => {
    res.render('register'); 
}); 

// Register Handle 
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body; 
    let errors = []; 

    // Check Required Fields 
    if(!name || !email || !password2) {
        errors.push({ msg: 'Please fill in all fields. ' }); 
    }

    // Check Passwords Match 
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match. ' }); 
    }

    // Check if the Password Length is at Least Six Characters. 
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least six characters. ' }); 
    }

    if(errors.length > 0) {
        res.render('register', {
            errors, 
            name, 
            email, 
            password, 
            password2 
        })
    } else {
        // Validation Passed 
        User.findOne({ email: email }) 
            .then(user => {
                if(user) {
                    // User Exists 
                    errors.push({ msg: 'Email is already registered. '})
                    res.render('register', {
                        errors, 
                        name, 
                        email, 
                        password, 
                        password2 
                    })
                } else {
                    const newUser = new User({
                        name, 
                        email, 
                        password 
                    }); 

                    // Hash Password 
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, 
                        (err, hash) => {
                            if(err) throw err; 
                            // Set newUser Password to Hashed Password 
                            newUser.password = hash; 
                            // Save newUser to the MongoDB 
                            newUser.save() 
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in. '); 
                                    res.redirect('/users/login'); 
                                }) 
                                .catch(err => console.log(err)); 
                        })); 

                    console.log(newUser); 
                }
            })

    }

}); 

// Log In Handle 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard', 
        failureRedirect: '/users/login', 
        failureFlash: true 
    })(req, res, next); 
}); 

// Log Out Handle 
router.get('/logout', (req, res) => {
    req.logout(); 
    req.flash('success_msg', 'You are logged out. '); 
    res.redirect('/users/login'); 
})

module.exports = router; 