var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')
var Schema = mongoose.Schema

var topicSchema = new Schema({
	newType: {
		type: String,
		required: true
	},
	newTitle: {
		type: String,
		required: true
	},
	newContent: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Topic', topicSchema)