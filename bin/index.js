#!/usr/bin/env node
const colors = require('colors')
const specials = require('../lib/specials.js') 

function list(entity, args){
	if(args.specials){
		specials.list(entity)
	}
	if(args.analysis){
		console.log("Analysis support coming soon.")
	}
	if(args.profile){
		console.log("Profile support coming soon.")
	}
}

function learn(entity, name, type, tags, image, text){
	specials.learn(entity, name, type, tags, image, text)
}

function forget(entity){
	specials.forget(entity)
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
  .command('list [Entity]')
  .option('-a, --analysis', 'Sets up the specials data')
  .option('-s, --specials', 'Sets up the specials data')
  .option('-p, --profile', 'Sets up the specials data')
  .alias('l')
  .description('Details of the contents of the named stream')
  .action((entity, args) => list(entity, args))

program
  .command('learn <Entity> <Name> <Type> [Tags] [Image] [Text]')
  .alias('k')
  .option('-i, --image', "Image representation of the special")
  .option('-i, --image', "Text that represents the special")
  .description('Teaches theOracle new specials. Say entity (think of it as a unique pet name), name, type and optionally a set of comma separated Tags, image or text that represents the entity')
  .action((entity, name, type, tags, image, text) => learn(entity, name, type, tags, image, text));

program.parse(process.argv);

