import { model, Schema } from "mongoose";
import { INote } from "../interface/note.interface";

const noteSchema = new Schema<INote>({
    title: { type: String, require: true, trim: true },
    content: { type: String, default: "" },
    category: {
        type: String,
        enum: ["personal", "working", "study", "others"]
    },
    pinned: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    tags: {
        name: String,
        color: { type: String, enum: ['red', 'black', 'white'] }
    }
});

export const Note = model<INote>("Note", noteSchema);