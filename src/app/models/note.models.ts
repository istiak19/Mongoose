import { model, Schema } from "mongoose";
import { IComment, INote } from "../interface/note.interface";

const commentSchema = new Schema<IComment>({
    text: String,
    createdAt: { type: Date, default: Date.now }
}, { _id: false })

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
    },
    comments: [commentSchema]
});

export const Note = model<INote>("Note", noteSchema);