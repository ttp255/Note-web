const mongoose = require('mongoose');
const {noteDB}=require('../config/init_db')
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    index:true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  
},{
  collection:'note',
  timestamps:true
});

module.exports = noteDB.model('Note', NoteSchema)