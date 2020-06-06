const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', schema)
