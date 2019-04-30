#!/usr/bin/env node

const fs = require('fs')
var json = new Map()
	
const learn = (entity, name, type, tags, image, text) => {	
	if(null == image){
		image = entity + ".jpg"
	}

	if(!text){
		text = name
	}
	
	json.entity = new Map()
	json.entity.image = image
	json.entity.text = text
	json.entity.name = name
	json.entity.type = type
	json.entity.tags = tags	
	try{		
		var specials = fs.readFileSync(entity + ".json")	
		json = JSON.parse(specials)
		refresh(entity)		
		console.log("Updating ", entity);
	}
	catch(err){
		console.log("Creating a new ", entity);
		refresh(entity)	
	}
}

const forget = (entity) => {
	try{
		fs.unlinkSync(entity + ".json")	
	}
	catch(err){
		console.log("I do not know", entity, '.');
		console.log("Teach me. Type --help");
	}	
}

const listSpecials = () => {
	try{
		var special = fs.readFileSync(knowledge + ".json")	
		json = JSON.parse(special)
		console.log(json)
		return json
	}
	catch(err){
		console.log("I have no Specials to offer. Teach me. Type theO --help to learn how.");
	}
}

const list = (entity, what) => {
	if(entity){
		try{
			var special = fs.readFileSync(entity + ".json")	
			json = JSON.parse(special)
			if(what){
				console.log(json.entity[what])
				return json.entity.what
			}
			else console.log(json.entity)
		}
		catch(err){
			console.log("I do not know", entity, '.');
			console.log("Teach me. Type --help");
		}
	}
	else listSpecials()
}

function refresh(entity){
	fs.writeFileSync(entity +".json", JSON.stringify(json))	
}

const program = require('commander');

program
  .version('0.0.1')
  .description('Node.js CLI for Brahma Services');

program
  .command('forget <Entity>')
  .alias('f')
  .description('Forgets a Special')
  .action((entity) => forget(entity))

program
  .command('list [Entity] [Name] Type] [Tags]')
  .alias('l')
  .description('Details of the Special')
  .action((entity, name, type, tags) => list(entity, name, type, tags))

program
  .command('listSpecials')
  .alias('l')
  .description('List all Specials')
  .action(() => listSpecials())

program
  .command('learn <Entity> <Name> <Type> [Tags] [Image] [Text]')
  .alias('k')
  .description('Teaches theOracle new specials. Say entity (think of it as a unique pet name), name, type and optionally a set of comma separated Tags, image or text that represents the entity')
  .action((entity, name, type, tags, image, text) => learn(entity, name, type, tags, image, text));

program.parse(process.argv);

