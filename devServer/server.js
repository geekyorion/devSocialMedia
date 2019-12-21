const express = require("express");
const mongoose = require("mongoose");

const app = express();

// database config
const db = require("./config/keys").mongoURI;

// database connectivity
mongoose
    .connect(db)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(err => {
        console.log(err);
    });

// API and routes definations
app.get("/", (req, res) => {
    res.send("Hello from devServer");
});

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
