import { Server } from 'http';
import app from "./app";
import mongoose from 'mongoose';

const port = 5000
let server: Server;
async function main() {
    try {
        await mongoose.connect('mongodb+srv://demoDB:jIrd2hFPr6p9f5GJ@cluster0.fnfrn.mongodb.net/noteDB?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connection to MongoDB!")
        server = app.listen(port, () => {
            console.log(`Mongoose app listening on port ${port}`)
        });
    } catch (error) {
        console.log(error)
    }
}

main()