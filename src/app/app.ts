import express, { Application, Request, Response } from "express";
import { noteRoute } from "./controllers/note.controllers.";
import { userRouter } from "./controllers/user.controllers";

const app: Application = express();
app.use(express.json())
app.use("/notes", noteRoute)
app.use("/user", userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to note app!')
});

export default app;