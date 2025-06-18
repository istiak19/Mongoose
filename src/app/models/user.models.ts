import { model, Schema } from "mongoose";
import { IUser } from "../interface/user.interface";
import validator from 'validator';

const userSchema = new Schema<IUser>({
    fName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: 4,
        maxlength: 20
    },
    lName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: 4,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email must be unique provide"],
        lowercase: true,
        validate: [validator.isEmail, "Invalid email sent!"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ["USER", "ADMIN"],
            message: '{VALUE} is not supported'
        },
        uppercase: true,
        default: "USER"
    }
});

export const User = model<IUser>("User", userSchema);