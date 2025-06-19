import express, { Request, Response } from 'express';
import { User } from '../models/user.models';
import { z } from 'zod';
import bcrypt from "bcryptjs";

export const userRouter = express.Router();

const userSchemaZod = z.object({
    fName: z.string(),
    lName: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
})

userRouter.get("/get-user", async (req: Request, res: Response) => {
    const userEmail = req.query.email;
    // let user = []
    // if (userEmail) {
    //     user = await User.find({ email: userEmail });
    // }
    // else {
    //     user = await User.find()
    // }
    // const user = await User.find().sort({ "email": -1})
    const user = await User.find().limit(2)
    res.status(201).json({ success: true, message: "Successfully user by get!", user })
});

userRouter.get("/get-user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(201).json({ success: true, message: "Successfully user by get!", user })
});

userRouter.post("/create-user", async (req: Request, res: Response) => {
    try {
        const userInfo = await userSchemaZod.parseAsync(req.body);

        // const password = await bcrypt.hash(userInfo.password, 10);
        // console.log(password)
        // userInfo.password = password

        // Built-in instance method
        // const user = new User(userInfo);
        // const password = await user.hashPassword(userInfo.password)
        // user.password = password
        // console.log(password)
        // await user.save();

        // Built-in Static Methods
        const password = await User.hashPassword(userInfo.password)
        console.log(password)
        userInfo.password = password;
        const user = await User.create(userInfo);
        res.status(200).json({ success: true, message: "Successfully user create!", user: user })
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message || 'Something went wrong' })
    }
});

userRouter.patch("/update-user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const userInfo = req.body;
    const user = await User.findByIdAndUpdate(id, userInfo, { new: true });
    res.status(200).json({ success: true, message: "Successfully user updated!", user })
})


userRouter.delete("/user-delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    // const user = await User.deleteOne({ _id: id });
    // const user = await User.findByIdAndDelete(id);
    const user = await User.findOneAndDelete({ _id: id });
    res.status(200).json({ success: true, message: "Successfully user updated!", user })
})