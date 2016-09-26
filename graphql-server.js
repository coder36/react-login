
var express = require('express');
var graphQLHTTP = require('express-graphql');
var schema = require('./data/schema');
var cors = require('cors');
var app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use( graphQLHTTP({
    schema,
    graphiql: true,
}));

var port = process.env.PORT || 3000;

var server = app.listen(port, function(err) {
    var host = server.address().address;
    var port = server.address().port;
    console.log('GraphQL Server listening at %s:%s', host, port);
});
