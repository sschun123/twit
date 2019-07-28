import Auth from './services//Auth';
import Search from './services/Search';
import File from './services/File';
import Bottleneck from 'bottleneck';

const BottleneckType:any = Bottleneck;
const {
	tweets_per_month,
	tweets_per_minute,
	tweets_per_second,
	tweets_per_request
} = require('./config/keys.json');

const query = process.argv[2];
const maxResults = process.argv[3];
const fromDate = process.argv[4];
const toDate = process.argv[5];

const twitterQuery = { query, maxResults, fromDate, toDate };

async function main () {
	const token = await Auth.getToken();
	console.log(token)
	const limiter = new BottleneckType({
		minTime: 150,
		maxConcurrent: 1,
		reservoir: tweets_per_minute,
		reservoirRefreshAmount: tweets_per_minute,
		reservoirRefreshInterval: 60 * 1000,
	});
	const search = new Search({
		perMonth: tweets_per_month,
		perMinute: tweets_per_minute,
		perSecond: tweets_per_second,
		tweetsPerRequest: tweets_per_request
	}, token);
	const limitSearch = limiter.wrap(search.search.bind(search));

	let i = 0;
	for (i; i < 10; i++) {
		const res = await limitSearch(twitterQuery);
		console.log(res);
	}
}

main();