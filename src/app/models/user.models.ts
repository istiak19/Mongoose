import { model, Schema } from "mongoose";
import { IUser } from "../interface/user.interface";

const userSchema = new Schema<IUser>({
    fName: { type: String, required: [true, 'First name is required'], trim: true },
    lName: { type: String, required: [true, 'Last name is required'], trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

export const User = model<IUser>("User", userSchema);