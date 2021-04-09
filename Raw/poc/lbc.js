//npm init -y
//npm install request (for every folder when you will use first time)

let request = require("request");
let cheerio = require("cheerio");
console.log("Before");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary"
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractData(html);
        //console.log(html);
    }
}
function extractData(html) {
    let selTool = cheerio.load(html);
    let commmentryArr = selTool(".col-14.col-md-15.col-lg-14 .match-comment-long-text");
    //cheerio index
    let lbc = selTool(commmentryArr[2]).text();//when cheerio access value by array.so at that printing time text and html function get lost we have to again wrap by a selecting tool 
    console.log(commmentryArr.length)
    console.log(lbc);
}
console.log("After");
