var connection = require(__dirname+'/connection.js');
var sequelize = require('sequelize');

var burger = require(__dirname+'/../models').Burger;
var customer = require(__dirname+'/../models').Customer;


module.exports = {
	selectAll: function (callback) {

		burger.findAll({
			where: {
				devoured: true
			},
			include: [{
				model: customer,
				where: {
					BurgerId: sequelize.col('burger.id')
				}
			}], 
			order: 'updatedAt ASC'
		}).then(function (results) {
			console.log('hi');
			console.log(results);
			var devouredArray = results;
			burger.findAll({
				where: {
					devoured: false
				}
			}).then(function (results) {
				console.log('hey');
				// console.log(results[0].burger_name);
				var notDevouredArray = results;
				var toHandlebars = {
					burgers: notDevouredArray,
					devoured: devouredArray
				}
				// console.log(toHandlebars);
				callback(toHandlebars);
			})
		});
	},
	insertOne: function (req, orm, callback) {
		burger.create({
			burger_name: req.body.burger,
			devoured: false
		}).then(function (results) {
			orm.selectAll(callback);
		})
	}, 
	updateOne: function (req, orm, devouredId, customerName, callback) {
			customer.create({
				name: customerName,
				BurgerId: devouredId
			}).then(function (result) {
				// console.log(result);
				// var customerId = result.id;
				// console.log('customerID is');
				// console.log(customerId);
				burger.update({
					devoured: true,
				}, {
					where: {
						id: devouredId
					}
				}).then(function (result) {
					orm.selectAll(callback)
				});
			});

		// connection.query('UPDATE burgers SET ? WHERE ?', [{
		// 	devoured: true
		// }, {
		// 	id: devouredId
		// }], function (err, result) {
		// 	if (err) throw err;
		// 	orm.selectAll(callback);
		// });
	}
};