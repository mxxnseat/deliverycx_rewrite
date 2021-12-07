const http = require("http");
const mockserver = require('mockserver');
const cors = require('cors');
const express = require('express')
var app = express()
app.use(cors());
app.use(mockserver("./mocks"));

app.listen(8765, () => {
    console.log(`Example app listening at http://localhost:8765`)
  })
//http.createServer(mockserver("./mocks")).listen(8765);
