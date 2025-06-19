import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserMethods, UserStaticMethods } from "../interface/user.interface";
import validator from 'validator';
import bcrypt from "bcryptjs";
import { Note } from "./note.models";


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

const userSchema = new Schema<IUser, UserStaticMethods, UserMethods>({
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
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Built-in Static Methods
userSchema.static("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10);
    return password;
});

// Pre Hooks

// Document middleware
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(this)
    next()
})

// Query middleware
userSchema.pre("find", function (next) {
    next()
})

// Post Hooks

// Document middleware
userSchema.post("save", function (doc, next) {
    console.log('%s has been saved', doc._id);
    next()
})

// Query middleware
userSchema.post("findOneAndDelete", async function (doc, next) {
    if (doc) {
        console.log(doc);
        await Note.deleteMany({ user: doc._id })
    }
    next()
})

// Using Virtuals

userSchema.virtual("fullName").get(function () {
    return `${this.fName} ${this.lName}`
})

export const User = model<IUser, UserStaticMethods>("User", userSchema);

// Built-in instance method
// userSchema.method("hashPassword", async function (plainPassword: string) {
//     const password = await bcrypt.hash(plainPassword, 10);
//     return password;
// })

// export const User = model<IUser, Model<IUser, {}, UserMethods>>("User", userSchema);