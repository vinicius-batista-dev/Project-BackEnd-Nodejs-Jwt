var bodyParser = require('body-parser');
var express = require('express');
var app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando ${PORT}`);
})