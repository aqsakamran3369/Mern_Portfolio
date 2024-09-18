const mongoose = require('mongoose');

console.log(process.env.mongo_url);
mongoose.connect(process.env.mongo_url 
   
);

const connection = mongoose.connection;
connection.on('error' , ()=>{
    console.log('Error Connecting to database');
});

connection.on('connected',()=>{
    console.log('Mongo DB connection Successful');
});
module.exports = connection;