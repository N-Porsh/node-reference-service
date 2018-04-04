const config = require('@myjar/config');
const { Service, RouteHandler } = require('@myjar/service-runner');
const migration = require('./models/migration');
const appController = require('./controllers/appController');

const service = Service.run();

// Usually, your route handlers would be in separate controllers like this:
service.route(`/api/${service.name}/v1/example`).post(new RouteHandler(appController.example));

// Example of simple remote API call. Note that all routes are wrapped in new RouteHandler(). This does magic.
service.route(`/api/${service.name}/v1/date`).get(new RouteHandler(async (req, res) => {
	const response = await req.http.get('http://time.jsontest.com/');
	return { ok: 'All is good', todayFromApi: response.date };
}));

service.route('/meta/info').get(new RouteHandler(async (req, res) => {
	req.logger.info('Logged from /meta/info');
	return { ok: 'All is good', env: process.env };
}));

// Sample custom health check. You might not need one, but if you do:
service.registerHealthCheck('example', async () => {
	await (new Promise(resolve => setTimeout(resolve, 100)));
	return {
		info: {
			waited: 'Custom health check OK after waiting 100ms for Godot',
		},
	};
});

// For dev env - set up database
if (config.get('migration.run')) {
	migration(service.logger);
}

service.listen();