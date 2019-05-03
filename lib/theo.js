const utils = require('./utils.js')

exports.configure = (config, entity) => {
	var knowledge = utils.knowledge()
	knowledge.config.folder = config
	console.log(knowledge);
	const fs = require('fs')
	fs.writeFileSync("./data/knowledge.json", JSON.stringify(knowledge))
}
