const { default: File } = require('../services/File.ts');

test('Throws error if directory is invalid', () => {
	function badPath () {
		new File(`${new Date()}/${Math.random()}/test`);
	}
	expect(badPath).toThrowError();
});

test('this.writePath is set on file instance', () => {
	const file = new File('./');
	expect(file.writePath).toBe('./');
});