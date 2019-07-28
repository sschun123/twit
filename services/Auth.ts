import * as rp from 'request-promise-native';

const { 
	consumer_key,
	consumer_secret
} = require('../config/keys.json');
const AUTH_URL = 'https://api.twitter.com/oauth2/token';

export default class AuthService {
	static encodeKeys (consumer_key:string, consumer_secret:string) {
		return Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');
	}

	static async getToken () {
		const encodedKeys = this.encodeKeys(consumer_key, consumer_secret);
		const { access_token } = JSON.parse(await rp({
			url: AUTH_URL,
			method: 'POST',
			headers: {
				'Authorization': `Basic ${encodedKeys}`
			},
			form: {
				grant_type: 'client_credentials'
			}
		}));
		return access_token;
	}
}
