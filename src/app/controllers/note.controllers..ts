import express, { Request, Response } from 'express';
import { Note } from '../models/note.models';

export const noteRoute = express.Router();

noteRoute.get("/note", async (req: Request, res: Response) => {
    const notes = await Note.find().populate("user");
    res.status(200).json({ success: true, message: "Successfully notes get!", notes });
});

noteRoute.get("/note/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    // const notes = await Note.findById(id);
    const notes = await Note.findOne({ _id: id });
    res.status(200).json({ success: true, message: "Successfully notes get!", notes });
})

noteRoute.post("/create-note", async (req: Request, res: Response) => {
    // way-1

    // const myNote = new Note({
    //     title: "Learning Express ",
    //     category: "personal",
    //     tags: {
    //         name: "Help",
    //         color: "red"
    //     }
    // });
    // await note.save()

    // way-2

    const body = req.body;
    const note = await Note.create(body);
    res.status(201).json({ success: true, message: 'Successfully notes created!', note })
});

noteRoute.patch("/updated/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    // const note = await Note.findByIdAndUpdate(id, body, { new: true });
    // const note = await Note.updateOne({ _id: id }, body, { new: true });
    const note = await Note.findOneAndUpdate({ _id: id }, body, { new: true });
    res.status(201).json({ success: true, message: "Successfully notes updated!", note })
});

noteRoute.delete("/delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id);
    // const note = await Note.findOneAndDelete(id);
    // const note = await Note.deleteOne(id);
    res.status(201).json({ success: true, message: "Successfully notes deleted!", note })
});