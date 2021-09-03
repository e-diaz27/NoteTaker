const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname,"../db/db.json"), "utf8", (err ,notes) => {
        if (err) throw err;
        res.json(JSON.parse(notes));
    })
}
);

router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id=uuidv4();

    return fs.readFile(path.join(__dirname,"../db/db.json"), "utf8", (err ,notes) => {
        if (err) throw err;
        const allNotes = JSON.parse(notes);

        allNotes.push(newNote);
        
        fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(allNotes) ,() => {
            res.json(newNote);
        })
    })
}
);

router.delete('/api/notes/:id', (req, res) => {
    console.log(req.params)
    const noteId = req.params.id;
    fs.readFile(path.join(__dirname,"../db/db.json"), "utf8", (err ,notes) => {
      const allNotes = JSON.parse(notes)
        
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = allNotes.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        fs.writeFile(path.join(__dirname,"../db/db.json"), JSON.stringify(result) ,() => {
  
        // Respond to the DELETE request
        res.json(`Your note been deleted 🗑️`);
      });
    }
  )});

module.exports = router;