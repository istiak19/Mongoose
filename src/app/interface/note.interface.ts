import { Types } from "mongoose"

export interface IComment {
    text: string,
    createdAt: Date
}

export interface INote {
    title: string,
    content: string,
    category: "personal" | "working" | "study" | "others",
    pinned: boolean,
    date: Date,
    tags: string,
    comments: IComment,
    user: Types.ObjectId
}