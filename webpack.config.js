var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: { 
		path: path.join(__dirname, 'public'),
		filename: 'app.bundle.js' 
	},
	module: {
		rules: [
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // Starts with the rightmost loader
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.js$/, exclude: /node_modules/,  
				use: { 
					loader: 'babel-loader',
	        		options: {
	          			presets: ['env', 'react']
	        		} 
        		}
        	}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ // Final index.html won't exist without this
			title: 'Beer Browser',
			minify: {
				collapseWhitespace: true
			},
			template: './src/index.html'
		})
	],
	
}