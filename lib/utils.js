const fs = require('fs')

exports.knowledge = () => {
	var knowledge = require('../data/knowledge.json')
	return knowledge
}

function special(entity){
	var specials = require('../data/entities/' + entity + '.json')
	return specials	
}

function specials(){
	var knowledge = require('../data/knowledge.json')
	return knowledge.specials	
}