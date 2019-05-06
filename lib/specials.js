const fs = require('fs')
const utils = require('./utils.js')

exports.forget = (entity) => {
	try{
		var knowledge = utils.knowledge()
		knowledge.specials.splice(knowledge.specials.indexOf(entity), 1)
		
		fs.writeFileSync(utils.pathToKnowledge, JSON.stringify(knowledge))	

		//fs.unlinkSync(utils.special(entity))	
	}
	catch(err){
		console.log(err)
		console.log("I do not know", entity, '.');
		console.log("Teach me. Type --help");
	}	
}

exports.list = (entity, what) => {
	if(entity){
		try{
			var special = utils.special(entity)
			if(what){
				return special.what
			}
			else console.log(special)
		}
		catch(err){
			console.log("I do not know", entity, '.');
			console.log("Teach me. Type theO --help");
		}
	}
	else listSpecials()
}

exports.learn = (entity, name, type, tags, image, text) => {	
	if(null == image){
		image = entity + ".jpg"
	}

	if(!text){
		text = name
	}
	var json = {}
	json.entity = new Map()
	json.entity.image = image
	json.entity.text = text
	json.entity.name = name
	json.entity.type = type
	json.entity.tags = tags	
	try{		
		refresh(entity, json)		
		console.log("Updating ", entity);
	}
	catch(err){
		console.log("Creating a new ", entity);
		create(entity)
	}
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

function create(entity){
	var knowledge = utils.knowledge()
	if(null == knowledge.specials){
		knowledge.specials = []
	}
	knowledge.specials.push(entity)
	fs.writeFileSync('./data/knowledge.json', JSON.stringify(knowledge))
}

function refresh(entity, json){
	fs.writeFileSync("./data/entities/" + entity +".json", JSON.stringify(json))	
}
