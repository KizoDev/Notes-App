
import { RequestHandler } from "express"
import Notemodel from "../model/note"
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getnotes:RequestHandler = async (req, res, next,) => {
    try {
        const note = await Notemodel.find().exec()
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }   
};

export const getnote:RequestHandler = async (req, res, next,) => {
    const noteId = req.params.noteId
    try {
        if (!mongoose.isValidObjectId(noteId) ) {
            throw createHttpError(404, "invalid note id") 
        }
        const note = await Notemodel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, "note not found")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
};

interface createbody {
    tittle?:string,
    text?:string
}
export const createnotes:RequestHandler<unknown, unknown, createbody, unknown> = async (req, res, next,) => {
    const tittle = req.body.tittle
    const text = req.body.text

    try {
        if (!tittle) {
            throw createHttpError(400,"tittle does not exixt")
        }
        const createnote = await Notemodel.create({
            tittle:tittle,
            text:text
        })
        res.status(200).json(createnote)
    } catch (error) {
        next(error)
    }
   
    
};
interface updateparams {
    noteId:string
}
interface updatebody {
    tittle?:string,
    text?:string
}
export const updatenote:RequestHandler<updateparams, unknown, updatebody, unknown> = async (req, res, next,) => {
    const noteId = req.params.noteId

    const newtittle = req.body.tittle
    const newtext = req.body.text

    try {
        if (!newtittle) {
            throw createHttpError(400,"tittle does not exixt")
        }
        
        if (!mongoose.isValidObjectId(noteId) ) {
            throw createHttpError(404, "invalid note id")
        }
        const note = await Notemodel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(404, "note not found")
        }
        note.tittle = newtittle,
        note.text = newtext

        const updatednote = await note.save()

        res.status(200).json(updatednote)

    } catch (error) {
        next(error)
    }
};

export const deletenote:RequestHandler = async (req, res, next,) => {
    const noteId = req.params.noteId
    try {
        if (!mongoose.isValidObjectId(noteId) ) {
            throw createHttpError(404, "invalid note id")
        }
        const note = await Notemodel.findByIdAndDelete(noteId).exec()
        if (!note) {
            throw createHttpError(404, "note not found")
        };
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
};




