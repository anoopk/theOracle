const fs = require('fs')
const config = require('../config.json')
const utils = require('./utils.js')

exports.init = () => {
}

const streams = ["labels", "texts", "specials", "landmarks", "logos"]

function aggregate(agg){
	count = {}			
	agg.forEach(function(el){
		count[el] = count[el] + 1 || 1
	});
	return count;
}

function init(entity){
	try{
		var special = JSON.parse(fs.readFileSync(utils.pathToEntity(entity), "utf8"))
		fs.readdir(config.dataLocation + "entities/" + entity + "/analysis", function(err, files){
			if(err){
				console.log("Analysis has not yet been performed for", entity)
			}
			else{
				files.forEach(function (file, index){					
					const analysis = JSON.parse(fs.readFileSync(config.dataLocation + "entities/" + entity + "/analysis/" + file, 'utf8'))
					streams.forEach(stream => {
						if(undefined == special[stream]){
							special[stream] = []
						}
						special[stream] = special[stream].concat(analysis[stream])
					})
				})
				streams.forEach(stream => {
					console.log(stream, aggregate(special[stream]))
				})
			}
		})
	}
	catch(err){
		throw("")
	}
}

function analyse(entity){
	try{
		var special = JSON.parse(fs.readFileSync(utils.pathToEntity(entity), "utf8"))		
		const analysis = JSON.parse(fs.readFileSync(config.dataLocation + "entities/" + entity + "/analysis/analysis.json", 'utf8'))
		for(image in analysis){
			streams.forEach(stream => {
				if(undefined == special[stream]){
					special[stream] = []
				}
				special[stream] = special[stream].concat(analysis[image][stream])
			})
		}
		streams.forEach(stream => {
			console.log(stream, aggregate(special[stream]))
		})			
	}
	catch(err){
		console.log(err)
		throw("")
	}
}

exports.list = (entity, what) => {
	if(entity){	
		try{
			analyse(entity)
		}
		catch(err){
			console.log(err)
			console.log("I do not know", entity, '.');
			console.log("Teach me. Type theO --help");
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

