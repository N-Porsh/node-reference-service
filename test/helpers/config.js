const config = require('config');

const host = process.env.TEST_HOST || 'localhost';
const port = process.env.TEST_PORT || config.get('service.port');
/* eslint-disable global-require */
const serviceName = process.env.npm_package_name || require('../../package.json').name;

const apiPath = `http://${host}:${port}/api/${serviceName}/v1`;

/* eslint-disable no-console */
console.log(`Testing ${serviceName} api at ${apiPath} [set TEST_HOST, TEST_PORT to change]`);
module.exports = { apiPath };