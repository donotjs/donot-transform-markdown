donot-transform-markdown
========================

[![Build Status](https://travis-ci.org/donotjs/donot-transform-markdown.svg?branch=master)](https://travis-ci.org/donotjs/donot-transform-markdown)

[markdown](http://npmjs.org/packages/markdown) compiler and renderer for [donot](http://github.com/donotjs/donot).

# Usage

Using the markdown donot transform plug-in is pretty easy.

	var http = require('http'),
	    donot = require('donot'),
	    MarkdownTransform = require('donot-transform-markdown');

	var server = http.createServer(donot(__dirname + '/public', {
		transforms: [ new MarkdownTransform({
			// Options
		}) ]
	}));

	server.listen(8000);

Now `.md` files in the `/public` folder will automatically be rendered and served as `.html` files.

# License

MIT
