var path = require('path');

var Weighin = require('./models/weighin');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '/../views/index.html'));
	});

	app.get('/api/weighins', function(req, res) {
		Weighin.find(function(err, weighins) {
			console.log('get', weighins);
			if (err) {
				res.send(err);
			}

			console.log(weighins);
			res.json(weighins);
		});
	});

	app.post('/api/weighins', function(req, res) {
		Weighin.create({
			created_at: new Date(),
			weight: 190,
			date: new Date()
		}, function(err, obj) {
			if (err) {
				throw err;
			}
			else {
				console.log("saved!");
			}
		})
	});

	app.put('/api/weighins/:weighin_id', function(req, res) {

	});

	app.delete('/api/weighins/:weighin_id', function(req, res) {

	});
}