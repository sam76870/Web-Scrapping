let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let PDFDocument = require("pdfkit");
let url = "https://github.com/topics";
console.log("Before");
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
    let anchor = selTool(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < anchor.length; i++) {
        let link = selTool(anchor[i]).attr("href");
        // let topicsName = selTool(anchor[0]).text();
        let fullLink = "https://github.com" + link;
        // console.log(fullLink);
        processrepoPage(fullLink);
    }
}
function processrepoPage(fullLink) {
    request(fullLink, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(error);
        } else {
            // console.log(fullLink);
            getRepoLink(html);
        }
    }
}
function getRepoLink(html) {
    let selTool = cheerio.load(html);
    let topicsElem = selTool("h1[class = 'h1-mktg']");
    let arr = selTool("a.text-bold");
    // console.log(arr.length);
    // console.log("topic Name -> ",topicsElem.length);
    // console.log(topicsElem.text());
    let topicName = topicsElem.text().trim();
    dircreator(topicName);
    for (let i = 0; i < 8; i++) {
        let repoPagelink = selTool(arr[i]).attr("href");
        repoName = repoPagelink.split("/").pop();
        repoName = repoName.trim();
        // console.log(repoName);
        // createFile(repoName, topicName);
        let fullRepoLink = "https://github.com" + repoPagelink + "/issues";
        getIssues(repoName, topicName, fullRepoLink);
    }
    console.log("`````````````````````````````````````");
}

function dircreator(topicName) {
    let pathOfFolder = path.join(__dirname, topicName);
    if (fs.existsSync(pathOfFolder) == false) {
        fs.mkdirSync(pathOfFolder);
    }
}

function createFile(repoName, topicName) {
    let pathofFile = path.join(__dirname, topicName, repoName + ".json");
    if (fs.existsSync() == false) {
        let createStream = fs.createWriteStream(pathofFile);
        createStream.end();
    }
}

function getIssues(repoName, topicName, repoPagelink) {
    request(repoPagelink, cb);
    function cb(err, resp, html) {
        if (err) {
            console.log(err);
        } else {
            extracIssues(html, repoName, topicName);
        }
    }
}

function extracIssues(html, repoName, topicName) {
    let selTool = cheerio.load(html);
    let IssuesAnchArr = selTool("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for (let i = 0; i < IssuesAnchArr.length; i++) {
        let name = selTool(IssuesAnchArr[i]).text();
        let link = selTool(IssuesAnchArr).attr("href");
        arr.push({
            "Name": name,
            "Link": "https://github.com" + link,
        })
    }
    // console.table(arr);
    //Write into json file into onject form
    let filePath = path.join(__dirname, topicName, repoName + ".pdf");
    // fs.writeFileSync(filePath,JSON.stringify(arr));
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(JSON.stringify(arr));
    pdfDoc.moveDown(0.5);
    pdfDoc.end();
}

console.log("After");