const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/index');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://localhost:27017/betApp')
mongoose.connection.once('open', () => {
    console.log('Connexion réussie');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('now listening for requests on port 3000');
});