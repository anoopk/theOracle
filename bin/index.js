#!/usr/bin/env node
const colors = require('colors')

const specials = require('../lib/specials.js')
const analysis = require('../lib/analysis.js')
const theo = require('../lib/theo.js')

function configure(config, entity, args){
	if(args.folder){
		theo.configure(config)
	}
	if(args.entity){
		theo.configure(config, entity)
	}	
}

function list(entity, filter, args){
	if(args.specials){
		specials.list(entity, filter)
	}
	else if(args.analysis){
		analysis.list(entity, filter)
	}
	else if(args.profile){
		console.log("Profile support coming soon.")
	}
	else specials.list(entity, filter)
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
  .command('list [Entity] [filter]')
  .option('-a, --analysis', 'Queries the analysis data')
  .option('-s, --specials', 'Queries the specials data')
  .option('-p, --profile', 'Queries the profile data')
  .alias('l')
  .description('CLI based tool to query the information gathered by the pipelines')
  .action((entity, filter, args) => list(entity, filter, args))

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
  .description('Starts the pipeline that analyzes images and text simultaneously using the best providers for the job, based on the options')
  .action((entity, args) => analyse(entity, args))

program
  .command('configure <jsonConfig> [folder]')
  .alias('c')
  .option('-f, --folder', "Sets the common folder which the SDK reads and writes data from")  
  .option('-i, --identity', "Sets the configuration for an entity")
  .description('Sets the configuration settings for the SDK')
  .action((config, folder, args) => configure(config, folder, args))

program
  .command('profile <Entity>')
  .option('-i, --images', 'Sets up the specials data')
  .option('-t, --text', 'Sets up the specials data')
  .alias('p')
  .description('Starts the pipeline that profiles an entity based on the (image/text) analysis performed. In a nutshell this adds meta tags to the entity based on the tags added to the images and text associated with it')
  .action((entity, args) => list(entity, args))

program
  .command('meet <Entity> <Name> <Type> [Tags] [Image] [Text]')
  .alias('k')
  .option('-i, --image', "Image representation of the special")
  .option('-t, --text', "Text that represents the special")
  .description('Teaches theOracle new specials. Say entity (think of it as a unique pet name), name, type and optionally a set of comma separated Tags, image or text that represents the entity')
  .action((entity, name, type, tags, image, text) => learn(entity, name, type, tags, image, text));

program.parse(process.argv);

