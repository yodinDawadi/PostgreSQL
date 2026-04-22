const Note = require('../models/note');


const getNotes = async (req,res)=>{
    const notes = await Note.findAll();
    res.status(201).json({
        message:"All notes are:",
        data: notes
    })
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

const deleteNote = async (req,res)=>{
    try {
        const { id } = req.params;
        const note =await Note.destroy({
            where: { id }
        });
        if (!note) {
            res.status(404).json({
                message: "Note not found !!"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {getNotes,addNote,deleteNote}