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

function analyse(entity, args){
	if(args.landmark){
		console.log();
		const analyser = require('../../Brahma-microservices/services/transformers/gcp/gcp.js')
		analyser.annotate(entity, JSON.parse('{"landmarks": true}'))
	}
	
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
  .command('analyze <Entity>')
  .option('-f, --folderLocation', 'Sets up the specials data')
  .option('-t, --text', 'Analyzes text sentiment using the Aylien Engine')
  .option('-i, --images', 'Analyzes images using various providers')
  .option('-il, --landmarks', 'Detects landmarks in images using GCP')
  .option('-it, --text', 'Detects text in images using AWS')
  .option('-ia, --labels', 'Annotates or tags the images using AWS')
  .option('-if, --faces', 'Detects faces in images using the AWS')
  .option('-io, --logos', 'Detects logos in images using the GCP')
  .alias('a')
  .description('Details of the contents of the named stream')
  .action((entity, args) => analyse(entity, args))

program
  .command('profile <Entity>')
  .option('-f, --folderLocation', 'Sets up the specials data')
  .option('-i, --images', 'Sets up the specials data')
  .option('-t, --text', 'Sets up the specials data')
  .alias('p')
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

