const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');


const entrySchema = new Schema({
  entryTitle: {
    type: String,
    required: 'Your entry needs a title!',
    trim: true,
  },
  entryContent: {
    type: String,
    required: 'Your entry needs some content!',
    trim: true,
  },
  entryAuthor: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timestamp) => dateFormat(timestamp),
  }
},
{
  toJSON: {
    getters: true
  }
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;
