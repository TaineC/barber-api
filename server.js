const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

var Shop = require('./shop-model');
var Staff = require('./staff-model');
var Test = require('./test-model');

const connectionString = 'mongodb+srv://user:blabla123@cluster0-tu99f.mongodb.net/Barber?retryWrites=true&w=majority';

mongoose.connect(connectionString,{ useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.static('public'))

var router = express.Router();

router.get('/testing', (req, res) => {
    res.send('<h1>Testing is working</h1>')
})

router.get('/shops', (req, res) => {

	Shop.find()
	.then((shops) => {
	    return res.json(shops);
	});
})

router.get('/shops/:id', (req, res) => {

    Shop.findOne({id: req.params.id})
    .populate('staff')
	.then((shops) => {
	    return res.json(shops);
	});
})

router.get('/staff', (req, res) => {

	Staff.find()
	.then((staff) => {
	    return res.json(staff);
	});
})

router.get('/test', (req, res) => {

	Test.find()
	.then((test) => {
	    return res.json(test);
	});
})


app.use('/api', router);

const apiPort = 4000;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));
