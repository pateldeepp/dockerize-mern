require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoDBConnString = process.env.DATABASE_URL || 'mongodb://localhost:27017/usersDB' ;

console.log(mongoDBConnString, 'MongoDBstring');

mongoose.connect(mongoDBConnString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
})
app.use(express.json());

const routes = require('./routes/routes');

/*
app.get('/api', (req, res) => {
    let users = ["user1", "user2", "user3", "user4", "user5"];
    res.json({
        "users": users
    });
});*/

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});