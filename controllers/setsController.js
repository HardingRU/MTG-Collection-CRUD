const setsDB = require('../models/setsDB.js')

module.exports = {
  index(req, res, next) {
    setsDB.findAll()
    .then(set => {
      res.locals.sets = set
      next()
    })
    .catch(err => next(err))
  }
}
