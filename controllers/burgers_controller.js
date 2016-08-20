var bodyParser = require('body-parser');
var orm = require(__dirname+'/../config/orm.js');

var burger = require(__dirname+'/../models').Burger;

module.exports = function (app) {
	//home page
	app.get('/index', function (req, res) {
		res.render('index.handlebars');
	});

	//add a burger
	app.post('/create', function (req, res) {
		orm.insertOne(req, orm, function(toHandlebars) {
			res.render('index.handlebars', toHandlebars)
		});



	});

	//devour a burger
	app.post('/devour', function (req, res) {
		var devouredId = req.body.id;
		var customer = req.body.customer;

		// burger.update({
		// 	devoured: true
		// }, {
		// 	where: {
		// 		id: devouredId
		// 	}
		// }).then(function (result) {
		// 	console.log(result)
		// })



		orm.updateOne(req, orm, devouredId, customer, function(toHandlebars) {
			res.render('index.handlebars', toHandlebars);
		});
	});
}