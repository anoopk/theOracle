#!/usr/bin/env node

const fs = require('fs')
var json = new Map()
const specials = require('../lib/specials.js') 

function list(entity, name, type, tags){
	specials.list(entity, name, type, tags)
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
  .command('list [Entity] [Name] [Type] [Tags]')
  .alias('l')
  .option('-s', '--specials', "Lists all the Special Entities")
  .description('Details of the Special')
  .action((entity, name, type, tags) => list(entity, name, type, tags))

program
  .command('learn <Entity> <Name> <Type> [Tags] [Image] [Text]')
  .alias('k')
  .option('-i, --image', "Image representation of the special")
  .option('-i, --image', "Text that represents the special")
  .description('Teaches theOracle new specials. Say entity (think of it as a unique pet name), name, type and optionally a set of comma separated Tags, image or text that represents the entity')
  .action((entity, name, type, tags, image, text) => learn(entity, name, type, tags, image, text));

program.parse(process.argv);

