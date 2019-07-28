const { default: Auth } = require('../services/Auth.ts');

test('#encodeKeys base64 encodes and concats consumer_key and consumer_secret', () => {
	const consumer_key = 'test_consumer_key';
	const consumer_secret = 'test_consumer_secret';
	const expected = Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');
	const actual = Auth.encodeKeys(consumer_key, consumer_secret);
	expect(actual).toBe(expected);
});