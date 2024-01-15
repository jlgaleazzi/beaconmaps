const express = require('express');
const Path = require('path');
const port = 3001;
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

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

app.put("/updateunits", (req, res) => {
    fs.readFile(`${__dirname}/data/data.json`, 'UTF8', (err,data) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Internal Server Error ${JSON.stringify(__dirname)}`);
            return;
        }
        let jsonData = JSON.parse(data);
        console.log('updating units');
        jsonData = req.body;
        const updatedJson = JSON.stringify()
        fs.writeFile(`${__dirname}/data/data.json`, updatedJson, 'UTF8', (err) => {
            if (err) {
                console.error('Error writing the file', err)
            } else {
                console.log('Units updated successfully!')
            }
        })
    });
})




module.exports = app;