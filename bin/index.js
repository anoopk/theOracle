#!/usr/bin/env node

const fs = require('fs')
var json = new Map()
	
const learn = (entity, name, type, tags) => {
	json.entity = new Map()
	json.entity.name = name
	json.entity.type = type
	json.entity.tags = tags
	try{		
		var specials = fs.readFileSync(entity + ".json")	
		json = JSON.parse(specials)
		refresh(entity)		
		console.log("Updating ", json);
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

const list = (entity, tags) => {
	try{
		var special = fs.readFileSync(entity + ".json")	
		json = JSON.parse(special)
		if(tags){
			console.log(json.entity.tags)
			return json.entity.tags
		}
		else console.log(json.entity)
	}
	catch(err){
		console.log("I do not know", entity, '.');
		console.log("Teach me. Type --help");
	}
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
  .command('list <Entity> [Name] Type] [Tags]')
  .alias('l')
  .description('List all specials on offer')
  .action((entity, name, type, tags) => list(entity, name, type, tags))

program
  .command('learn <Entity> <Name> <Type> [Tags]')
  .alias('k')
  .description('Teaches theOracle new specials. Say entity (think of it as a unique pet name), name, type and optionally a set of comma separated Tags')
  .action((entity, name, type, tags) => learn(entity, name, type, tags));

program.parse(process.argv);

