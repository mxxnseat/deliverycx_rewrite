const http = require("http");
const mockserver = require('mockserver');

http.createServer(mockserver("./mocks")).listen(8765);
