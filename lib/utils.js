const fs = require('fs')
const config = require('../config.json')

exports.pathToKnowledge = config.dataLocation + 'knowledge.json'

exports.pathToEntity = (entity) => {
	return config.dataLocation + "/entities/" + entity + '.json'
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

