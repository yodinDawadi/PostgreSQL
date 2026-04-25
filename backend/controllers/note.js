const Note = require('../models/note');


const getNotes = async (req,res)=>{
    const notes = await Note.findAll({
        where:{uid: req.user.uid}
    });
    res.status(200).json({
        message:"All notes are:",
        data: notes
    })
}

const addNote = async (req,res)=>{
    try {
        const {title,description}= req.body;
    const note = await Note.create({
        title,
        description,
        uid: req.user.uid
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
            where: { id, uid:req.user.uid }
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

const editNote = async (req,res)=>{
    try {
        const { id } = req.params;
        const { title,description } = req.body;
        const note = await Note.update({
            title,
            description
        },{
            where: {id, uid: req.user.uid}
        });
        if (!note){
            res.status(404).json({
                message:"Note not found !!"
            })}
        
        res.status(200).json({
            message:"Note Updated !!",
            data: note
        })
    } catch (error) {
        
    }
}

module.exports = {getNotes,addNote,deleteNote,editNote}