import  express, { Router }  from "express";
const router = express.Router()

import * as Notescontroller from "../controllers/notes";

router.post("/createnotes", Notescontroller.createnotes)

router.get("/getnote/:noteId", Notescontroller.getnote)

router.get("/getnotes", Notescontroller.getnotes)

router.put("/updatenote/:noteId", Notescontroller.updatenote)

router.delete("/deletenote/:noteId", Notescontroller.deletenote)



export default router