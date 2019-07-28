import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'json2csv';

export default class FileService {
	writePath:string;

	constructor (writePath:string) {
		const absPath = path.resolve(writePath);
		const stats:fs.Stats = fs.statSync(absPath);
		if (!stats.isDirectory()) {
			throw new Error(`${absPath} is not a valid directory`);
		}
		this.writePath = writePath;
	}

	private async writeFilePromise (fileName:string, data:string) {
		const filePath = `${this.writePath}/${fileName}`;
		return new Promise((resolve, reject) => {
			console.log(`Writing to ${filePath}`);
			fs.writeFile(filePath, data, 'utf8', err => {
				if (err) return reject(err);
				return resolve();
			})
		})
	}

	private async jsonToCSV (jsonData:any) {
		try {
			return parse(jsonData);
		} catch (e) {
			throw new Error(e);
		}
	}

	async writeFile (fileName:string, data:string) {
		try {
			await this.writeFilePromise(fileName, data);
		} catch (e) {
			throw new Error(e);
		}
		console.log('Success!');
	}
}