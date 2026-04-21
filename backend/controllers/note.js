const Note = require('../models/note');


const getNotes = async ()=>{
    const notes = await Note.findAll();
    console.log(notes)
}
const addNote = async (req,res)=>{
    try {
        const {title,description}= req.body;
    const note = await Note.create({
        title,
        description
    });

    res.status(201).json({
        message: "Note Sucessfully Created",
        data: note
    })
    } catch (error) {
        res.status(500).json({
            message: "Error creating note",
            error: error.message
        })
    }
    
};

module.exports = {getNotes,addNote}