const express = require('express');
const Path = require('path');
const port = 3001;
const app = express();
const fs = require('fs');

app.use((_,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin. X-Requested-with, Content-Type, Accept");
    next();
});

app.use(express.static(Path.join(__dirname, "../dist")));
app.use(express.json());
app.listen(port, () => console.log(`Express listening on port ${port}`));

app.get("/units", (req , res) => {
    fs.readFile(`${__dirname}/data/data.json`, 'UTF8', (err,data) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Internal Server Error ${JSON.stringify(__dirname)}`);
            return;
        }
        const jsonData = JSON.parse(data);
        console.log('/units called')
        res.json(jsonData);
            })
        });




module.exports = app;