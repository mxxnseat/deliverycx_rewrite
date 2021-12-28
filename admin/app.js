import express from "express";
import {exec} from "child_process";

const app = express();



app.post("/update", (req,res)=>{
    console.log("we are updating")

    exec("cd .. && docker-compose -f ./docker-compose.iiko.yml up",(error, stdout, stderr) => {
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


app.listen(6000, ()=>{
    console.log("start")
})