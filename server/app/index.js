import express from 'express';
import http from 'http';
import fs from 'fs';
import compress from 'compression';
import config from '../../settings/dev';
import fetch from 'node-fetch';
var debug = require('debug')(process.pid);

//import DebugMiddleware from './app/middleware/debug';

debug('yo');
let app = express();

var client_id = config.client_id, redirect_uri = config.redirect_uri, scope =config.scope , state = config.state;


app.get('/',(req,res)=>{
	res.redirect('https://github.com/login/oauth/authorize?client_id='+client_id+'&state='+state+'&scope='+scope);
});
app.get('/success',(req,res)=>{
	if(typeof req.query.code !== 'undefined' && req.query.state === config.state ){
		//res.send(req.query.code);	
		fetch('https://github.com/login/oauth/access_token',{
			method: 'POST',
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		      body: JSON.stringify({
		        client_id: config.client_id,
		        client_secret: config.client_secret,
		        code : req.query.code,
		        state:config.state
		      })
		    }).then(response=>response.json()).then(response => {
		    	res.send(response);
		    });	
	}else{
		res.send(req);
	}

});

app.get('/fail',(req,res)=>{
	res.send('fail');
});


var httpServer = http.createServer(app);
httpServer.listen(3030);


console.log( process.env.NODE_ENV + " server running at " + 3030);