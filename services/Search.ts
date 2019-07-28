import * as rp from 'request-promise-native';
const moment = require('moment');

const SEARCH_URL:string = 'https://api.twitter.com/1.1/tweets/search/fullarchive/dev.json';

interface Query {
	fromDate?: string,
	toDate?: string,
	maxResults: string,
	query: string
}

interface RateLimit {
	perMonth:number,
	perMinute:number,
	perSecond:number,
	tweetsPerRequest:number,
}

export default class SearchService {
	rateLimit:RateLimit;
	token:string;

	constructor (rateLimit:RateLimit, token:string) {
		this.rateLimit = rateLimit;
		this.token = token;
	}

	static _formatSearchQuery (searchQuery:Query) {
		const { fromDate, toDate, maxResults, query } = searchQuery;

		try {
			return {
				fromDate: this._formatDate(fromDate),
				toDate: this._formatDate(toDate),
				maxResults: parseInt(maxResults, 10),
				query
			};
		} catch (e) {
			throw new Error(e);
		}
	}

	static _formatDate (date:string) {
		return moment(date).format('YYYYMMDDHHmm');
	}

	async search (searchQuery:Query) {
		const qs = SearchService._formatSearchQuery(searchQuery);
		const res = await rp({
			url: SEARCH_URL,
			method: 'GET',
			headers: {
				authorization: `Bearer ${this.token}`
			},
			useQuerystring: true,
			qs
		});
		return JSON.parse(res);
	}
}