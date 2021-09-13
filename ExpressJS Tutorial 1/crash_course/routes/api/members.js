const express = require('express'); 
const members = require('../../Members'); 
const uuid = require('uuid'); 


const router = express.Router(); 

// Creating Route 
// Gets All Members 
// The path is '/' because '/api/members' is the parent route defined in index.js 
router.get('/', (req, res) => {
    res.json(members); 
}); 

// Get Single Member 
router.get('/:id', (req, res) => {
    // Boolean If Exists 
    const found = members.some(member => member.id === parseInt(req.params.id)); 
    
    if(found) {
        res.json(members.filter(member => 
            member.id === parseInt(req.params.id)));   
    } else {
        res.status(400).json({ msg: `No member with the id of: ${req.params.id}. ` })
    }
}); 

// Create Member 
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(), 
        name: req.body.name, 
        email: req.body.email, 
        status: 'active'
    }
    
    if(!newMember.name || !newMember.email) {
        return res.status(400).json( { msg: 'Please Include a Name and Email' }); 
    } 

    members.push(newMember); 
    // Redirect to the same page reloads with the newly added Member. 
    // res.redirect('/'); 

    // Returns JSON List of Members 
    res.json(members); 

}); 

// Update Member 
router.put('/:id', (req, res) => {
    // Boolean If Exists 
    const found = members.some(member => member.id === parseInt(req.params.id)); 
    
    if(found) {
        const updateMember = req.body; 
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name; 
                member.email = updateMember.email ? updateMember.email : member.email; 
                res.json({ msg: 'The member was updated. ', member })
            }
        }); 
    } else {
        res.status(400).json({ msg: `No member with the id of: ${req.params.id}. ` })
    }
}); 

// Delete Member 
router.delete('/:id', (req, res) => {
    // Boolean If Exists 
    const found = members.some(member => member.id === parseInt(req.params.id)); 
    
    if(found) {
        res.json({ 
            msg: 'Member Deleted. ', 
            member: members.filter(member => 
            member.id !== parseInt(req.params.id))});   
    } else {
        res.status(400).json({ msg: `No member with the id of: ${req.params.id}. ` })
    }
}); 


module.exports = router; 