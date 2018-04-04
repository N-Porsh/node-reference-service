const td = require('testdouble');
const chai = require('chai');

const { expect } = chai;

describe('appController', () => {

	after(() => {
		td.reset();
	});

	it('should return example response', async () => {
		const req = {
			body: {},
		};

		const validator = td.replace('../../../src/helpers/validator');
		td.when(validator.validate(td.matchers.isA(String), req.body))
			.thenReturn({ valid: true });

		const appModel = td.replace('../../../src/models/appModel');
		td.when(appModel.getExampleResponse(req)).thenResolve('All good!');

		/* eslint-disable global-require */
		const appController = require('../../../src/controllers/appController');
		const result = await appController.example(req);

		expect(result.status).to.equal(200);
		expect(result.data).to.equal('All good!');
	});
});