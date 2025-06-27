const dotenv = require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const PORT = process.env.PORT;


const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const connectToDb = require("./db/db");
connectToDb();

app.get("/", (req, res) => {   
    res.send("Hello World!");
}); 


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})