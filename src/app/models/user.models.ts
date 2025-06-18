import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserMethods } from "../interface/user.interface";
import validator from 'validator';
import bcrypt from "bcryptjs";


const addressSchema = new Schema<IAddress>({
    street: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    postalCode: {
        type: Number,
        required: true
    }
}, {
    _id: false
})

const userSchema = new Schema<IUser, Model<IUser>, UserMethods>({
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
    },
    address: { type: addressSchema }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.method("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
})

export const User = model<IUser>("User", userSchema);