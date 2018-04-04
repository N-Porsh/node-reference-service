const fs = require('fs');
const swaggerModelValidator = require('swagger-model-validator');

const swaggerModel = JSON.parse(fs.readFileSync('public/swagger.json'));

swaggerModelValidator(swaggerModel);

/*
 * Validates model from swagger
 * @Model: string
 * @body: Object<payload>
 */

function validate(model, body) {
	const disallowExtraProps = true;
	const allowBlankTarget = true;

	return swaggerModel.validateModel(model, body, allowBlankTarget, disallowExtraProps);
}

module.exports = { validate, swaggerModel };
