const fs = require('fs')
const config = require('../config.json').pecfy

exports.pathToKnowledge = config.dataLocation + 'knowledge.json'

exports.pathToEntity = (entity) => {
	return config.dataLocation + "analysis/entities/" + entity
}

exports.pathToEntities = () => {
	return config.dataLocation + "analysis/entities/"
}

exports.knowledge = () => {
	var knowledge = require("../data/knowledge.json")
	return knowledge
}

exports.special = (entity) => {
	var special = require('../data/analysis/entities/' + entity + '.json')
	return special.entity
}

exports.analysis = (entity) => {
	var analysis = require('../data/analysis/entities/' + entity + 'analysis.json')
	return analysis
}

