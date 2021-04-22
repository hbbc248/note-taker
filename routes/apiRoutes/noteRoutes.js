const router = require('express').Router();
const { nanoid } = require('nanoid');
const { createNewNote, validateNote, deleteNote, filterNotes } = require('../../lib/notes');
var { notes } = require('../../db/db');

// get notes request handler
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

// post new note request handler
router.post('/notes', (req, res) => {
    // set unique id using nanoid npm
    req.body.id = nanoid();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});

// delete note request handler
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    notes = deleteNote(filterNotes(noteId, notes))
    res.json(notes);    
});
  
module.exports  = router;