const fs = require("fs");
const markov = require("./app");
const axios = require("axios");
const process = require("process");

function createTxt(txt) {
    let t = new markov.MarkovMachine(txt);
    console.log(t.makeText());
}

function getTxt(path) {
    fs.readFile(path, "utf8", function (err, data){
        if (err){
            console.log(err);
            process.exit(1);
        } else {
            createTxt(data);
        }
    });
}

async function getUrlTxt(url) {
    let res;
    try { 
        res = await axios.get(url)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
    createTxt(res.data)
}

let path = process.argv[2];

if (path.slice(0,4) ==='http'){
    getUrlTxt(path);
} else{
    getTxt(path);
}
