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
    let teamName = [];
    let bothBatsmanTable = selTool(".table.batsman");
    let TeamNameArrlen = selTool(".Collapsible h5.header-title.label");
    let teamNameArr = [];
    for (let i = 0; i < TeamNameArrlen.length; i++) {
        let teamName = selTool(TeamNameArrlen[i]).text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        ///console.log(teamName);
        teamNameArr.push(teamName);

        for (let i = 0; i < bothBatsmanTable.length; i++) {
            let batsmanNameElem = selTool(bothBatsmanTable[i]).find("tbody tr .batsman-cell a");

            for (let j = 0; j < batsmanNameElem.length; j++) {
                let link = selTool(batsmanNameElem[j]).attr("href");
                let teamName = teamNameArr[i];
                let name = selTool(batsmanNameElem[j]).text();
                printBirhtday(link, name, teamName);
            }
            //console.log("````````````````````````````````````````");
        }
    }

    function printBirhtday(link, name, teamName) {
        request(link, cb);
        function cb(error, response, html) {
            if (error) {
                console.log(error);
            }
            else {
                extractBirthday(html, name, teamName);
                console.log("````````````````````````````````````````");
                // console.log(extractBirthday(html, name));
            }
        }
    }
    function extractBirthday(html, name, teamName) {
        let selTool = cheerio.load(html);
        let birthdayElem = selTool(".ciPlayerinformationtxt span");
        let birthday = selTool(birthdayElem[1]).text();
        console.log(name + " Plays for " + teamName + " was born on " + birthday);
    }
}