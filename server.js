const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/database.js');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', require('./routes/api/users'));
//Put API routes here, before the 'catch all' route
app.use(require('./config/auth'));
app.use('/api/fridges', require('./routes/api/fridges'));
app.use('/api', require('./routes/api/profile'));
// this is going to do double duty, serving both items and categories-related routes:

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
	console.log(`Express running on port ${port}`);
});
