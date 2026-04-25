const express = require("express");
const router = express.Router();
const {getNotes, addNote,deleteNote,editNote} = require('../controllers/note');
const isAuth = require('../middlewares/auth')

router.get('/',isAuth,getNotes);
router.post('/',isAuth,addNote);
router.delete('/:id',isAuth,deleteNote);
router.put('/:id',isAuth,editNote);

module.exports = router;