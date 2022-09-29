const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  briefDesc: {
    required: true,
    type: String,
  },
  resultDesc: {
    required: true,
    type: String,
  },
  github: {
    required: true,
    type: String,
  },
  demoLink: {
    required: true,
    type: String,
  },
  // img: {
  //   required: true,
  //   type: String,
  // },
})

module.exports = mongoose.model('Data', dataSchema)
