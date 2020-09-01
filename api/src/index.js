const express = require('express')
var cors = require('cors')
var uuid = require('uuid');
var bodyParser = require('body-parser')
const app = express();

const port = 8000;

  
app.use(cors());
app.use(bodyParser.json());

const list = {
    '1': {
        text: 'banananas',
        id: '1',
        isCompleted: false,
    },
    '2': {
        text: 'tomatoes',
        id: '2',
        isCompleted: false,
    },
    '3': {
        text: 'milk',
        isCompleted: false,
        id: '3'
    },
    '4': {
        text: 'eggs',
        isCompleted: false,
        id: '4'
    },
    '5': {
        text: 'kale',
        isCompleted: false,
        id: '5'
    }
}

app.get('/api/items', function (req, res) {
    res.json(list);
  })

app.get('/api/item/:id', function (req, res) {
    const id  = req.params.id;
    if (list[id]){
        res.json(list[id]);
    } else {
        res.status(404).send("Sorry can't find it")
    }
})

app.post('/api/item', function (req, res) {
    const id  = uuid.v4();
    const text = req.body.text;
    list[id] = {id, text, isCompleted: false}
    res.json(list[id]);
})

app.put('/api/item/:id', function (req, res) {
    const {id} = req.params;
    const {text, isCompleted} = req.body;
    if (list[id]){
        list[id] = { ...list[id], text, isCompleted }
        res.json(list[id]);
    } else {
        res.status(404).send("Sorry can't find it")
    }
})

app.delete('/api/item/:id', function (req, res) {
    const id = req.params.id;
    if (list[id]){
        delete list[id];
        res.json({status: 'deleted'});
    } else {
        res.status(404).send("Sorry can't find it")
    }
})

const server = app.listen(port, () => {
  console.log(`api is listening at http://localhost:${port}`)
})


module.exports = { app, server };