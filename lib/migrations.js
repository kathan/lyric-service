const sequelize = require('./dbConnection')
let complete = false

if(!complete){
    sequelize.sync()
    complete = true
}