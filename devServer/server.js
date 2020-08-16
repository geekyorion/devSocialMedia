const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');

// import various api(s)
const user = require("./routes/api/user");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// database config
const db = require("./config/keys").mongoURI;

// database connectivity
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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
