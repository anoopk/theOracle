const fs = require('fs')
var specials = require("./specials.json")

//learn({"anoop": {
//		"image": "anoop.jpg",
//		"relation": "Self",
//		"tags": ["Self"]
//}}) 

//forget("siddu")
 
function refresh(specials){
	fs.writeFileSync("./specials.json", JSON.stringify(specials))	
}

function learn(json){
	specials.push(json);
	refresh(specials)
}

const list = (name) => {
	specials.map(special => console.log(Object.keys(special)[0], Object.values(special)[0]))
}

function forget(entity){
	delete specials[0][entity]
	console.log(JSON.stringify(specials))
	refresh(specials)
} 	
