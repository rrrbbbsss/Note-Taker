const router = require('express').Router();
const { getNotes, createNote, deleteNote } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
});

router.post('/notes', (req, res) => {
    // validate the post request
    if (createNote(req.body)) {
        // send data back as the response
        res.json(req.body);
    } else {
        res.status(400).send('The note json is not properly formatted.')
    }
});

router.delete('/notes/:id', (req, res) => {
        // delete the note of the id which will update db.json
        deleteNote(req.params.id);
        // send data back as the response
        res.json(req.body);
});

module.exports = router;