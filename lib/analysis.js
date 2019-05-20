const fs = require('fs')
const config = require('../config.json').pecfy
const utils = require('./utils.js')

exports.analyse = () => {}

const aspects = ["labels", "texts", "specials", "landmarks", "logos"]

function aggregate(agg){
	count = {}		
	var tags = config.tags
	agg.forEach(function(el){
		count[el] = count[el] + 1 || 1
	})
	return count;
}

function analyse(entity, filter){
	try{
		var special = JSON.parse(fs.readFileSync(utils.pathToEntities() + entity + ".json"), "utf8")
		const analysis = JSON.parse(fs.readFileSync(utils.pathToEntity(entity) + "/analysis.json", 'utf8'))
		var count = 0;
		for(image in analysis){
			count++
			aspects.forEach(aspect => {
				if(undefined == special[aspect]){
					special[aspect] = []
				}
				if(analysis[image][aspect] && analysis[image][aspect].length > 0)
					special[aspect] = special[aspect].concat(analysis[image][aspect])
			})
		}
		aspects.forEach(aspect => {
			if((undefined == filter) || aspect == filter)
				console.log(aspect, aggregate(special[aspect]))
		})
		console.log("\nNumber of images analysed", count)		
	}
	catch(err){
		//console.log(err)
		throw("")
	}
}

exports.check = (image, community) => {
	const analysis = JSON.parse(fs.readFileSync(utils.pathToEntity(community) + "/analysis.json", 'utf8'))
	console.log(analysis[image])
}

exports.list = (entity, what) => {
	if(entity){	
		try{
			analyse(entity, what)
		}
		catch(err){
			console.log(err)
			console.log("I do not know", entity, '. Or s\\he has not been analysed yet. Talk to Brahma.')
			console.log("Or teach me. Type theO --help")
		}
	}
	else listSpecials()
}

function listSpecials(){
	try{
		var specials = utils.knowledge()
		if(specials.specials.length == 0){
			assert(false)
		}			
		console.log(specials.specials)		
	}
	catch(err){
		console.log("I have no Specials to offer. Teach me. Type theO --help to learn how.");
	}
}

