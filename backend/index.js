import express from "express";
import cors from "cors";
import Routes from "./routes/route.js";
import bodyParser from "body-parser";
import Connection from "./database/db.js";

const app = express();
app.use(bodyParser.json({ extender: true }));

app.use(cors());
app.use(express.json());
app.use("/", Routes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
Connection();