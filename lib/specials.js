exports.list = (entity, what) => {
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

exports.learn = (entity, name, type, tags, image, text) => {	
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
		create(entity)
	}
}

exports.forget = (entity) => {
	try{
		var knowledge = require('../knowledge.json')
		knowledge.entities.splice(knowledge.entities.indexOf(entity), 1)
		fs.writeFileSync('./knowledge.json', JSON.stringify(knowledge))	
		
		fs.unlinkSync(entity + ".json")	
	}
	catch(err){
		console.log("I do not know", entity, '.');
		console.log("Teach me. Type --help");
	}	
}

function listSpecials(){
	try{
		var knowledge = require('../knowledge.json')
		if(knowledge.entities.length == 0){
			assert(false)
		}			
		console.log(knowledge.entities)	
	}
	catch(err){
		console.log("I have no Specials to offer. Teach me. Type theO --help to learn how.");
	}
}

function create(entity){
	var knowledge = require('../knowledge.json')
	knowledge.entities.push(entity)
	fs.writeFileSync('./knowledge.json', JSON.stringify(knowledge))
	
	fs.writeFileSync(entity +".json", JSON.stringify(json))	
}

function refresh(entity){
	fs.writeFileSync(entity +".json", JSON.stringify(json))	
}
