import express, { Request, Response } from 'express';
import { User } from '../models/user.models';
import { z } from 'zod';
export const userRouter = express.Router();

const userSchemaZod = z.object({
    fName: z.string(),
    lName: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
})

userRouter.get("/get-user", async (req: Request, res: Response) => {
    const user = await User.find();
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
        // console.log(userInfo)
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
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully user updated!", user })
})