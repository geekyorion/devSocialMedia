const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from devServer");
});

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});