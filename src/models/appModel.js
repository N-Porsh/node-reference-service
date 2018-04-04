const db = require('../helpers/postgres');
const path = require('path');
const { QueryFile } = require('pg-promise');

const exampleSQL = new QueryFile(path.join(__dirname, './sql/example/getAllRows.sql'));

/*
 * run exampleSQL query and resolve result or reject
 */
function getExampleResponse(context) {
	return new Promise((resolve, reject) => {
		const start = Date.now();

		db.any(exampleSQL, {})
			.then((data) => {
				context.metrics.timing('sql.finish', (Date.now() - start));
				return resolve(data);
			})
			.catch((err) => {
				context.metrics.timing('sql.finish', (Date.now() - start));
				return reject(err);
			});
	});
}

module.exports = {
	getExampleResponse,
};
