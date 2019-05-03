const fs = require('fs')

exports.knowledge = () => {
	var knowledge = require("../data/knowledge.json")
	console.log(knowledge);
	return knowledge
}

exports.special = (entity) => {
	var special = require('../data/entities/' + entity + '.json')
	return special.entity	
}

