const express = require("express");
const router = express.Router();
const {getNotes, addNote,deleteNote,editNote} = require('../controllers/note');

router.get('/',getNotes);
router.post('/',addNote);
router.delete('/:id',deleteNote);
router.put('/:id',editNote);

module.exports = router;