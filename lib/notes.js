const fs = require("fs");
const path = require("path");


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}
  
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
}

function filterNotes(noteId, notes) {
    const newNotesArr = notes.filter(note => note.id !== noteId);
    return newNotesArr    
}

function deleteNote (newNotesArr) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: newNotesArr }, null, 2)
      );
      return newNotesArr;
}

module.exports = {
    createNewNote,
    validateNote,
    deleteNote,
    filterNotes
  };

















