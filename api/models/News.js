const mongoose = require('mongoose');

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
  datetime: {
    type: Date,
    required: true,
    min: (new Date()).toISOString(),
  },
  deleted: {
    type: Boolean,
    default: false
  }
});


const News = mongoose.model('News', NewsSchema);
module.exports = News;