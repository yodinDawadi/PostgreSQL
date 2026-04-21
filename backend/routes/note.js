const express = require("express");
const router = express.Router();
const {getNotes, addNote} = require('../controllers/note');

router.get('/getNotes',getNotes);
router.post('/addNote',addNote);

module.exports = router;