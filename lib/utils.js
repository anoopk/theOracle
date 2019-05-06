const fs = require('fs')

exports.pathToKnowledge = 'D:/N15477 P13353/D Drive/Projects/Samples/theOracle/data/knowledge.json'
exports.pathToEntity = (entity) => {
	return 'D:/N15477 P13353/D Drive/Projects/Samples/theOracle/data/entities/' + entity + '.json'
}

exports.knowledge = () => {
	var knowledge = require("../data/knowledge.json")
	return knowledge
}

exports.special = (entity) => {
	var special = require('../data/entities/' + entity + '.json')
	return special.entity	
}

exports.analysis = (entity) => {
	var analysis = require('../data/entities/' + entity + '/analysis/anoop.jpg.json')
	return analysis
}

