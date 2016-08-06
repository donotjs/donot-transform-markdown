'use strict';

const fs = require('fs');
const marked = require('marked');

const Transform = require('@donotjs/donot-transform');

class MarkdownTransform extends Transform {

	constructor(options) {
		super();
		this.options = options || {};
	}

	canTransform(filename) {
		return /\.(html|htm)$/i.test(filename);
	}

	allowAccess(filename) {
		return !/\.md$/i.test(filename);
	}

	map(filename) {
		return filename.replace(/\.(html|htm)$/i, '.md');
	}

	compile(filename, data) {
		return new Promise((resolved, rejected) => {
			marked(data.toString(), this.options, (err, result) => {
				if (err) return rejected(err);
				resolved({
					data: new Buffer(result),
					files: [filename]
				});
			});
		});
	}

}

exports = module.exports = MarkdownTransform;
