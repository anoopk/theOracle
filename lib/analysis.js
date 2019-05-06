const fs = require('fs')
const utils = require('./utils.js')

exports.list = (entity, what) => {
	if(entity){
		try{
			var analysis = utils.analysis(entity)
			if(what){
				console.log(analysis[what])
			}
			else console.log(analysis)
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

