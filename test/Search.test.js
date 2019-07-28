const { default: Search } = require('../services/Search.ts');

test('#_formatSearchQuery formats to correct formats', () => {
	const fakeQuery = {
		fromDate: '2020-03-01 12:00',
		toDate: '2020-03-02 12:00',
		maxResults: '20',
		query: 'testing',
	};

	const formatted = Search._formatSearchQuery(fakeQuery);
	expect(formatted).toHaveProperty('fromDate', '202003011200');
	expect(formatted).toHaveProperty('toDate', '202003021200');
	expect(formatted).toHaveProperty('maxResults', 20);
	expect(formatted).toHaveProperty('query', 'testing');
});