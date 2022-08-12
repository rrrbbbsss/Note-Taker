const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function validateInputNote(note) {
    const schema = { title: 'string', text: 'string' };
    // test to make sure incoming object matches the note schema
    // (ignoring the id for the note)
    const test = Object.keys(note).length == Object.keys(schema).length &&
        Object.keys(note).reduce(((acc, x) => acc && (typeof (note[x]) === schema[x])), true);
    return test;
}

function getNotes() {
    // synchronously read from file or now...
    return JSON.parse(fs.readFileSync(
        path.join(__dirname, '../db/db.json')
    ));
}
function createNote(note) {
    if (validateInputNote(note)) {
        // get the notes
        let noteArray = getNotes();
        // add the uuid onto the note
        note.id = uuidv4();
        // push it onto the note array
        noteArray.push(note);
        // synchronously write to file for now...
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(noteArray, null, 2)
        );
        return true;
    }
    return false;
}

function deleteNote(id) {
    // filter out the id to delete from the noteArray
    const noteArray = getNotes().filter(x => x.id !== id);
    // synchronously write to file for now...
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(noteArray, null, 2)
    );
}

module.exports = { validateInputNote, getNotes, createNote, deleteNote };