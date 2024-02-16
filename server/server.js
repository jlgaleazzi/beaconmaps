const express = require('express');
const Path = require('path');
const port = 80;
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use((_,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers",
    "Origin. X-Requested-with, Content-Type, application/json, text/plain, Accept");
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

app.get("/warehouses", (req, res) => {
    fs.readFile(`${__dirname}/data/warehouses.json`, 'UTF8',(err,data) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Internal Server Error ${JSON.stringify(__dirname)}`);
            return
        }
        const jsonData = JSON.parse(data);
        console.log('Warehouses called')
        res.json(jsonData);
        })
    })


app.put("/updateunits", (req, res) => {
    fs.readFile(`${__dirname}/data/data.json`, 'UTF8', (err,data) => {
        if (err) {
            console.error(err);
            res.status(500).send(`Internal Server Error ${JSON.stringify(__dirname)}`);
            return;
        }
        let fileData = JSON.parse(data);
      // loop through layers

        //console.log(`from file ${JSON.stringify(jsonData)}`)
        let newData = req.body;


        //console.log(`new data ${JSON.stringify(newData)}`)
        // add layer if it doesnt exists
        newData.layers.forEach((layer) => {
            console.log(`layer in newdata :${layer.label}`)
            let foundLayer = fileData.layers.find(({ label }) => label === layer.label)
            if ( foundLayer !== undefined) {
                console.log('layer exists --> rewrite units')
                layer.units.forEach((unit) => {
                    let foundUnitIdx = foundLayer.units.findIndex(( { identifier }) => identifier === unit.identifier);
                    if (foundUnitIdx !== -1) {
                        // replace foundUnit in oldData
                        foundLayer.units[foundUnitIdx] = unit;
                    } else  {
                        foundLayer.units.push(unit)
                    }
                })
            } else {
                //    add layer
                fileData.layers.push(layer)
            }

        })
        const updatedJson = JSON.stringify(fileData)

        fs.writeFile(`${__dirname}/data/data.json`, updatedJson, 'UTF8', (err) => {
            if (err) {
                console.error('Error writing the file', err)
            } else {
                const msg = 'Units updated successfully!'
                console.log(msg)
                res.send(msg)
            }
        })
    });
})




module.exports = app;