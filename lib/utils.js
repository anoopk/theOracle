const fs = require('fs')
const config = require('../config.json')

exports.pathToKnowledge = config.dataLocation + 'knowledge.json'

exports.pathToEntities = () => {
	return config.dataLocation + "/entities/"
}

exports.pathToEntity = (entity) => {
	return config.dataLocation + "/entities/" + entity + '/analysis.json'
}

exports.knowledge = () => {
	var knowledge = require('../data/knowledge.json')
	return knowledge
}

exports.special = (entity) => {
	var special = require('../data/entities/' + entity + '/analysis.json')
	return special.entity	
}

exports.analysis = (entity) => {
	var analysis = require('../data/analysis/entities/' + entity + '/analysis.json')
	return analysis
}

