import express from "express";
const app = express()

import Notemodel from "./model/note";



app.get("/getnotes", async (req, res, next,) => {
    const note = await Notemodel.find().exec()
    res.status(200).json(note)
})

export default app