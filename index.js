const fs = require('fs')
//const {list, learn} = require('./specials.js')
var specials = require("./specials.json")

const learn = (name, json) => {
	console.log(">>>>>>>>>>>>>>>>>>", name, json)
	//refresh(specials)
}

const list = (name) => {
	specials.map(special => console.log(Object.keys(special)[0], Object.values(special)[0]))
}

function refresh(specials){
	fs.writeFileSync("./specials.json", JSON.stringify(specials))	
}

const program = require('commander');

program
  .version('0.0.1')
  .description('Node.js CLI for Brahma Services');

program
  .command('list [name]')
  .alias('l')
  .description('List all specials')
  .action(name => list({name}))

program
  .command('learn <name>')
  .alias('r')
  .description('Teaches the program new specials')
  .action((name, json) => learn(name, json));

program.parse(process.argv);

