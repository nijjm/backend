const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator');  //Importing Express validator

const fetchUser = require('../Middleware/fetchUser');
const Note = require('../models/Notes');


//Route 1: Get All the notes using: GET "/api/notesfetchnotes" Login Required
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2: Add a new note using: POST '/api/notes/addnote' Login Required
router.post('/addnote', fetchUser, [
    body('title', 'Enter valid Title').isLength({ min: 3 }),         //Conditions needed for data
    body('description', 'At least 5 characters').isLength({ min: 5}),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //If errors are encountered, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Update an existing note using: PUT '/api/notes/updatenote' Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {   //Use put for updating
    try {
        const { title, description, tag } = req.body;
         
        //Create a newnote object
        const newNote={};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not found");}

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed")
        }

        note= await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}); //Find and update note
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



//Route 4: Delete an existing note using: DELETE '/api/notes/deletenote' Login Required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {   //Use put for updating
    try {
         
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not found");}

        //Allow deletion of the note only if user owns the note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed")
        }

        note= await Note.findByIdAndDelete(req.params.id); //Find and update note
        res.json({"Success":"Note Deleted", note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
