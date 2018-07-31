// Libraries Require
let XLSX = require('xlsx');
let yaml = require('js-yaml');
let fs   = require('fs');
let JSONLDParser = require('rdf-parser-jsonld');
let stringToStream = require('string-to-stream');
let rdf = require('rdf-ext');
let SparqlStore = require('rdf-store-sparql');

// Custom Require
let utils = require('./utils');

// My Code starts here
let config = yaml.safeLoad(fs.readFileSync('config/people.yml', 'utf8'));

let sampleFile = XLSX.readFile('samples/people.xlsx');

let sheetName = utils.getSheetName(config);
let rawJson = XLSX.utils.sheet_to_json(sampleFile.Sheets[sheetName]);

let mappedJsonLD = utils.mapParsedFile(rawJson, config);

let parser = new JSONLDParser();
let stream = parser.import(stringToStream(JSON.stringify(mappedJsonLD)));

let output = []

stream.on('data', (triple) => {
  output.push(triple);

})

let store = new SparqlStore({
    endpointUrl: 'http://localhost:10037/repositories/testPeople/sparql'
});

return rdf.waitFor(store.import(stream)).then((outp) => {
    console.log(outp);
  }, (error) => console.log(">>> ERROR", error));