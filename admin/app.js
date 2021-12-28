const path = require("path");
const {exec} = require("child_process");
const express = require("express");
const app = express();


app.get("/", (req, res)=>{
        console.log("we are updating")

    exec("cd .. && docker-compose -f ./docker-compose.iiko.yml up", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
            console.log(`stdout: ${stdout}`);
    });
    
    res.status(200);
});
app.listen(7000, ()=>{
    console.log("start")
})