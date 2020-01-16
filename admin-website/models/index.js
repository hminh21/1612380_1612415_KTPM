const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')
const Schema = mongoose.Schema;
const basename = path.basename(__filename)
const db = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))
    if (model.modelName) {
        db[model.modelName] = model
    }
  });

module.exports = db
