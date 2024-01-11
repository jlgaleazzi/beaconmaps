const express = require("express");
const Path = require("path");
const port = 3001;
const app = express;

app.use((_,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin. X-Requested-with, Content-Type, Accept");
    next();
});

app.use(express.static(Path.join(__dirname, "../build")));
app.use(express.json());
app.listen(port, () => console.log(`Express listening on port ${port}`));

module.exports = app;