const express = require('express');

const router = express.Router();

const lowdb = require('lowdb')

const parser = require('body-parser')

const serveStatic = require('serve-static')

const app = express();

app.use(parser.json());

app.get('/',(request, response, next) => {
	next();
	console.log("working");
});

app.post('/',(request, response) => {
	console.log('post happening')

});

app.put('/',(request, response) => {
  response.send('Got a PUT request at /user')
});

app.delete('/user',(request, response) => {
  response.send('Got a DELETE request at /user')
});

app.use('/', serveStatic('public',{
	'index': ['index.html']
}));

app.listen(3000, () => {
	console.log('lsitening on port 3000');
});

