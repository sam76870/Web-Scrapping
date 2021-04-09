//npm init -y
//npm install request (for every folder when you will use first time)

let request = require("request");
let cheerio = require("cheerio");
console.log("Before");
request("https://www.linkedin.com", cb);
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
    let elem = selTool("#join-cta__header.join-cta__header");
    console.log(elem.html());
}
console.log("After");
