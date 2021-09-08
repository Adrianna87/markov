/** Command-line tool to generate Markov text. */
const fs = require("fs")
const markov = require("./markov")
const process = require("process")
const axios = require("axios")

let args = process.argv.slice(2);

function createText(words) {
  let mm = new markov.MarkovMachine(words)
  console.log(mm.makeText());
}

function fileText(file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      console.error(`Error reading ${file}: ${err}`);
      process.exit(1);
    } else {
      createText(data);
    }
  });
}

async function urlText(url) {
  let resp;
  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
  createText(resp.data)
}

if (args[0] === "file") {
  fileText(args[1])
} else if (args[0] === "url") {
  urlText(args[1])
} else {
  console.log("Must be txt file or url")
}