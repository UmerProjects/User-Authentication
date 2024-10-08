import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, URI } from "./config/index.js";
import Router from "./routes/index.js";


const server = express();

server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// CONNECT DATABASE

main().catch(err => console.log(err));

console.log(URI);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/checktheUser');

}

Router(server);

server.listen(5005, () =>
    console.log(`Server running on http://localhost:${5005}`)
);
