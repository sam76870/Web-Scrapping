let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractData(html);
    }
}
function extractData(html) {
    let selTool = cheerio.load(html);
    // get the bowling table of both the innings
    let bothBatsmanTable = selTool(".table.batsman");
    let TeamNameArrlen = selTool(".Collapsible h5.header-title.label");
    let teamNameArr = [];
    for(let i = 0 ; i < TeamNameArrlen.length;i++){
        let teamName = selTool(TeamNameArrlen[i]).text();
        teamName = teamName.split("INNINGS")[0];
        ///console.log(teamName);
        teamNameArr.push(teamName);
    }
    //console.log(teamNameArr);
    // console.log(tableHtml);
    // get the names and wickets of every player
    for(let i = 0; i<bothBatsmanTable.length; i++){
        let batsmanNamelem = selTool(bothBatsmanTable[i]).find("tbody tr .batsman-cell");
        for(let j =0 ; j < batsmanNamelem.length; j++){
            let playername = selTool(batsmanNamelem[j]).text();
            console.log(playername, "plays for ",teamNameArr[i]);
        }
        console.log("````````````````````````````````````````");
    }
}