let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
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

    let MatchCard = selTool(".col-md-8.col-16");
    console.log(MatchCard.length);
    let allLinks = [];
    for (let i = 0; i < MatchCard.length; i++) {
        let cardBtns = selTool(MatchCard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");

        let linkofMatch = selTool(cardBtns[2]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + linkofMatch;
        allLinks.push(fullLink);
        //console.log(fullLink);
        // getPlayerOfTheMatchName(fullLink);
    }
    serialPlayer(allLinks, 0);
}

function serialPlayer(allLinks, n) {
    if (allLinks.length == n) {
        return;
    }
    request(allLinks[n], function (err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractPlayer(html);
            serialPlayer(allLinks, n + 1);
            console.log("````````````````````````````````````````````````");
        }
    })
}
// function getPlayerOfTheMatchName(fullLink){
// request(fullLink ,cb);
//     function  cb(error , response ,html){
//         if(error){
//             console.log(error);
//         }
//         else{
//             extractPlayer(html);
//             console.log("``````````````````````````````````````````````````````````");
//         }
//     }
// }
function extractPlayer(html) {
    let selTool = cheerio.load(html);
    let PlyerDetails = selTool(".best-player-content").text();
    console.log(PlyerDetails);
}