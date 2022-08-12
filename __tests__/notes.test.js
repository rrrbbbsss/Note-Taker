const fs = require('fs');
const path = require('path');
const { 
    getNotes, 
    createNote, 
    validateInputNote,
    deleteNote 
} = require('../lib/notes');
const uuid = require('uuid');

jest.mock('fs');

test('validateInputNote success', () => {
    const inputNote = { title: "test", text: "blah"};
    const result = validateInputNote(inputNote);

    expect(result).toEqual(true);
});
test('validateInputNote fail', () => {
    const inputNote = { title: "test", tet: "blah"};
    const result = validateInputNote(inputNote);

    expect(result).toEqual(false);
});


test('getNotes', () => {
    const readvalue = '[]';
    fs.readFileSync.mockReturnValue(readvalue);
    const result = getNotes();

    expect(result).toEqual([]);
});
test('getNotes', () => {
    const readvalue = '[{"title": "test", "text": "blah", "id": "ca01c691-1ed0-4cde-b7d2-b72b29226b04"}]';
    const readvalueParse = JSON.parse(readvalue);
    fs.readFileSync.mockReturnValue(readvalue);
    const result = getNotes();

    expect(result).toEqual(readvalueParse);
});



test('createNote success', () => {
    const readvalue = '[]';
    const readvalueParsed = [];
    const note = { title: "test", text: "blah"};
    fs.readFileSync.mockReturnValue(readvalue);
    const result = createNote(note);
    const args = fs.writeFileSync.mock.calls[0];
    const noteId = JSON.parse(args[1])[0].id;

    expect(result).toBe(true);
    expect(args[0]).toEqual(path.join(__dirname,'../db/db.json'));
    expect(uuid.validate(noteId)).toEqual(true);
});
test('createNote fail', () => {
    const readvalue = '[]';
    const note = { title: "test", teasdft: "blah"};
    fs.readFileSync.mockReturnValue(readvalue);
    const result = createNote(note);

    expect(result).toBe(false);
});


test('deleteNote nothing', () => {
    const id = "aa01c691-1ed0-4cde-b7d2-b72b29226b05";
    const readvalue = '[{"title": "test", "text": "blah", "id": "ca01c691-1ed0-4cde-b7d2-b72b29226b04"}]';
    const readvalueParse = JSON.parse(readvalue);
    fs.readFileSync.mockReturnValue(readvalue);
    const result = deleteNote(id);
    const args = fs.writeFileSync.mock.calls[0];
    const updated = JSON.parse(args[1]);

    expect(result).toBe(undefined);
    expect(args[0]).toEqual(path.join(__dirname,'../db/db.json'));
    expect(updated).toEqual(readvalueParse);
});
test('deleteNote something', () => {
    const id = "ca01c691-1ed0-4cde-b7d2-b72b29226b04";
    const readvalue = '[{"title": "test", "text": "blah", "id": "ca01c691-1ed0-4cde-b7d2-b72b29226b04"}]';
    fs.readFileSync.mockReturnValue(readvalue);
    const result = deleteNote(id);
    const args = fs.writeFileSync.mock.calls[0];
    const updated = JSON.parse(args[1]);

    expect(result).toBe(undefined);
    expect(args[0]).toEqual(path.join(__dirname,'../db/db.json'));
    expect(updated).toEqual([]);
});