const fs = require('fs')
const utils = require('./utils.js')

exports.init = () => {
}

function init(entity){
	var labels = [];
	try{
		const special = require(utils.pathToEntity(entity))	
		
		fs.readdir("./", function(err, files){
			files.forEach(function (file, index){
				var analysis = JSON.parse(fs.readFileSync(file, "utf8"))
				labels = labels.concat(analysis.labels)
				count = {}			
				labels.forEach(function(el){
					count[el] = count[el] + 1 || 1
				});
				special.labels = count
				fs.writeFileSync(utils.pathToEntity(entity), JSON.stringify(special))
				console.log(count)
			})
		})
	}
	catch(err){
		console.log("Correcr configuation.")
	}
}

exports.list = (entity, what) => {
	if(entity){
		init(entity)		
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

