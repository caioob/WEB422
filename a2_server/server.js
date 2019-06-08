const express = require("express");
const app = express();
const port = 8080

app.get('/', (req, res) =>{
    res.sendFile(__dirname+'/JSON_AJAX_PRAC.json');
});

app.listen(port, () => console.log("connected"));
