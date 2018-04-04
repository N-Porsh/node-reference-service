const chai = require('chai');

const chaiHttp = require('chai-http');
const config = require('../helpers/config');

const { expect } = chai;

chai.use(chaiHttp);

const api = chai.request(config.apiPath);

const apiEndpoint = '/healthCheck';

describe(apiEndpoint, () => {

	it('should return custom field', () => api.get(apiEndpoint)
		.then((res) => {
			expect(res.status).to.equal(200, 'Response status');
			expect(res.body.info).has.property('example');
			expect(res.body.info.example).has.property('waited').is.a('string');
		}));
});
