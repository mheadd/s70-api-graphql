var graphql = require ('graphql').graphql;
var express = require('express');
var graphQLHTTP = require('express-graphql');
var Schema = require('./schema');

let app = express();
app.listen(8080);
app.use('/', graphQLHTTP({ schema: Schema, pretty: true }));
