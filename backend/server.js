const express = require('express');
const cors = require('cors');
const mongoos = require('mongoose');

//add codeing
/////////////////////////////////////////////////////////////////////////////////////////////
const bodyParser = require('body-parser');
const io = require('socket.io')(3100, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
// body-parser

// collections
const Temperaturas = require('./models/temperaturas.model');
/////////////////////////////////////////////////////////////////////////////////////////////
 require('dotenv').config();
 const app = express();
 app.use(bodyParser.json());     //////////////////////////////////
 const port = process.env.port || 5000;
 var mongoDB = 'mongodb://127.0.0.1:27017, 127.0.0.1:27018, 127.0.0.1:27019/db_dsf_02?replSet=repliSet';

 mongoos.connect(mongoDB, {
    db: {native_parser: true},
    function (err) {
      if(err){
        throw err
      }
      console.log('Database connected')
    },
    replset: {
      auto_reconnect:false,
      poolSize: 10,
      socketOptions: {
        keepAlive: 1000,
        connectTimeoutMS: 30000
      }
    },
    useUnifiedTopology: true,
    server: {
      poolSize: 10,
      socketOptions: {
        keepAlive: 1000,
        connectTimeoutMS: 30000
      }
    }
  });
  Temperaturas.watch().on('change',(change)=>{
    console.log('Something has changed')
    console.log(change)
    io.sockets.emit('changes', change.updateDescription)
  });
 const connection = mongoos.connection;

 connection.once('open', ()=>{
     console.log("MongoDB database connection established successfully");
 });

 io.on('connection',(socket)=>{
  console.log('client is connected');
})

 app.use(cors());
 app.use(express.json());

 const route = require('./routes/route');
 
 app.use('', route);
 

 app.listen(port, () =>{
     console.log(`Server is running on port: ${port}`);
 })