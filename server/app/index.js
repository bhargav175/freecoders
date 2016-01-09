import express from 'express';
import http from 'http';
import fs from 'fs';
import compress from 'compression';
import config from '../../settings/dev';

//import DebugMiddleware from './app/middleware/debug';

let app = express();

var client_id = config.client_id, redirect_uri = config.redirect_uri, scope ='' , state = 'pika';


app.get('/',(req,res)=>{
	res.redirect('https://github.com/login/oauth/authorize?client_id='+client_id);
});
app.get('/success',(req,res)=>{
	console.log(res);
	res.send('success');
});

app.get('/fail',(req,res)=>{
	res.send('fail');
});


var httpServer = http.createServer(app);
httpServer.listen(3030);


console.log( process.env.NODE_ENV + " server running at " + 3030);