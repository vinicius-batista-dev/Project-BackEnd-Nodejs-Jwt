var bodyParser = require('body-parser');
var express = require('express');
const router = require('./routes/routes');
var app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", router );

app.listen(PORT, () => {
    console.log(`Servidor rodando ${PORT}`);
})