const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  image: String,
  deleted: {
    type: Boolean,
    default: false
  }
});


NewsSchema.plugin(idvalidator);
const News = mongoose.model('News', NewsSchema);
module.exports = News;