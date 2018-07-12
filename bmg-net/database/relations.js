/*

NOTE THIS IS JUST FOR EXAMPLE

*/

'use strict';

let schemas = require('./schemas')

module.exports = () => {
	// schemas.Users.hasMany(schemas.Steps)
	// schemas.Users.belongsToMany(schemas.Questions, {through: schemas.UsersQuestions})
	// schemas.Questions.belongsToMany(schemas.Users, {through: schemas.UsersQuestions})
	// schemas.UserData.belongsTo(schemas.Users)
}
