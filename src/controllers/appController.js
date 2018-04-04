const errorHandler = require('../helpers/errorHandlers');
const validator = require('../helpers/validator');

const appModel = require('../models/appModel');

/*
 * App example controller for /example route
 */
async function example(req) {
	/*
	 * Validate "ExampleModel" with POST payload (req.body) and return error if !valid
	 */
	const validation = validator.validate('ExampleModel', req.body);

	if (validation.valid === false) {
		throw new errorHandler.Validation({
			rid: req.id,
			errors: validation.GetErrorMessages(),
		});
	}

	/*
	 * Get Example Response from model and send response if resolved.
	 */
	const response = await appModel.getExampleResponse(req);
	const data = {
		status: 200,
		message: 'Some random hello worlds',
		data: response,
	};

	return data;
}

module.exports = {
	example,
};
