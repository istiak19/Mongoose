import express, { Request, Response } from 'express';
import { User } from '../models/user.models';
export const userRouter = express.Router();

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
    const userInfo = req.body;
    const user = await User.create(userInfo);
    res.status(200).json({ success: true, message: "Successfully user create!", user })
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