const chai = require('chai');

const chaiHttp = require('chai-http');
const config = require('../helpers/config');
const rp = require('request-promise-native');


const { assert, expect } = chai;

chai.use(chaiHttp);

const api = chai.request(config.apiPath);

describe('/v1/example', () => {

	const apiEndpoint = '/example';

	it('should return status 200', () => api.post(apiEndpoint)
		.send({ name: 'validationexample' })
		.then((res) => {
			assert.equal(res.status, 200, 'Response status');
			assert.equal(res.body.message, 'Some random hello worlds', 'Response message result');
			const dataTexts = res.body.data;
			for (let i = 0; i < dataTexts.length; i += 1) {
				const textId = i + 1;
				assert.equal(`Hello World ${textId}`, dataTexts[i].text, `Response data text #${textId}`);
			}
		}));

	it('empty payload / should return status 400', async () => {
		const res = await rp({
			uri: `${config.apiPath}/example`,
			json: true,
			resolveWithFullResponse: true,
			simple: false, // Allow non-2xx status through
			method: 'POST',
		});
		expect(res.statusCode).to.equal(400, 'Bad HTTP Code');
		expect(res.headers['content-type']).to.include('application/json', 'Bad content type');

		assert.equal(res.body.message, 'Error when validating data', 'Response message result');
		assert.equal(res.body.data.errors[0], 'name is a required field', 'Response data error');
	});

	it('/GET request / should return status 404', () => api.get(apiEndpoint)
		.catch((res) => {
			assert.equal(res.status, 404, 'Response status');
		}));

	it('payload with additional fields/ should return status 400', () => api.post(apiEndpoint)
		.send({ name: 'validationexample', name1: 'validationexample1' })
		.catch((err) => {
			const invalidField = 'name1';
			assert.equal(err.status, 400, 'Response status');
			assert.equal(err.response.body.message, 'Error when validating data', 'Response message result');
			assert.equal(err.response.body.data.errors[0], `Target property '${invalidField}' is not in the model`, 'Response data error');
		}));
});
