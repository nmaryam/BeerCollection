let express = require('express');
let app = express();
let autoLoader = require('auto-loader');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let compression = require('compression');

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json());


let App = autoLoader.load(__dirname +'/App');
global.Controller = App.Controllers;
global.Helper = App.Helpers;
global.Model = App.Models;
global.Middleware = App.Middlewares;
global.Mongoose = mongoose;
global.Schema = mongoose.Schema;
global.Config = autoLoader.load(__dirname+'/Config');

mongoose.connect(Config.DB.url + Config.DB.name, (err)=>{
	if(err)
		console.log('Unable to connect to '+ Config.DB.name + ' database.');
	else
		console.log('Successfully connected to '+ Config.DB.name + ' database.')
});

global.Route = express.Router();
// if(Config.Api.prefix == ""){
	app.use('/', require(__dirname+'/Routes/routes'));
// }
// else{
// 	app.use('/'+Config.Api.prefix+'/', require(__dirname+'/Routes/'+Config.Api.version+'/routes'));
// }

app.listen(Config.App.port, ()=>{
	console.log('Airtango Server Successfully Started.');
});
