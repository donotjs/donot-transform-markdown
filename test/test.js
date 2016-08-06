/*jshint expr: true*/

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const MarkdownTransform = require('../');

chai.should();
chai.use(chaiAsPromised);

const testFile = path.normalize(__dirname + '/data/test.md');

var transform = new MarkdownTransform();

describe('markdown', () => {

	var test;
	var malformed;
	var compiled;
	before(() => {
		test = fs.readFileSync(testFile);
	});

	describe('compiler', () => {

		it ('should return true when filename is .html', () => {
			expect(transform.canTransform('my.html')).to.be.true;
		});

		it ('should return false when filename is .md', () => {
			expect(transform.canTransform('my.md')).to.be.false;
		});

		it ('should return false when filename is .md', () => {
			expect(transform.allowAccess('my.md')).to.be.false;
		});

		it ('should return true when filename is .htm', () => {
			expect(transform.allowAccess('my.htm')).to.be.true;
		});

		it ('should return rendered markdown', () => {
			return transform.compile(testFile, test).then((result) => {
				expect(result).to.be.an('object');
				expect(result).to.have.property('data');
				expect(result).to.have.property('files');
				expect(result.data.toString()).to.be.equal('<h1 id="this-is-markdown">This is markdown</h1>\n');
				expect(result.files).to.be.an.array;
				expect(result.files[0]).to.be.a('string');
				compiled = result.data;
			}).should.eventually.be.fulfilled;
		});

	});

});
