const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./config/database.js');

const app = express();
const { cloudinary } = require('./cloudinary');


app.use(logger('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended:true}));

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/api/images', async (req, res) => {
	const {resources} = await cloudinary.search.expression('folder:dml_default')
	.sort_by('public_id', 'desc')
	.maxresults(100)
	.execute();
	const publicIds = resources.map( file =>
		 file.public_id) ;
		 res.send(publicIds);
}) 
app.use('/api/users', require('./routes/api/users'));
//Put API routes here, before the 'catch all' route
app.use(require('./config/auth'));
app.use('/api/fridges', require('./routes/api/fridges'));
app.use('/api', require('./routes/api/profile'));
app.post('/api/upload', async (req, res) => {
	try {
	  const fileStr =req.body.data;
	  const uploadedResponse = await cloudinary.uploadeder.upload(fileStr, {upload_preset: 'dml_default'  
	  })
	  console.log(uploadedResponse);
	  res.json({msg: "YAYAYAYA"})
	} catch (error) {
		console.error(error)
		res.status(500).json({err: 'Something went wrong'})
	}
})
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
