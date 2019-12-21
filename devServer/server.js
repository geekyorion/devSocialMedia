const express = require("express");
const mongoose = require("mongoose");

// import various api(s)
const user = require("./routes/api/user");

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

app.use("/api/user", user);

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
