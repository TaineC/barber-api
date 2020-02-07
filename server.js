const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const Shop = require('./shop-model');
const Staff = require('./staff-model');
const Cutting = require('./cutting-model');
const Waiting = require('./waiting-model');

const connectionString = 'mongodb+srv://user:blabla123@cluster0-tu99f.mongodb.net/Barber?retryWrites=true&w=majority';

mongoose.connect(connectionString,{useUnifiedTopology: true, useNewUrlParser: true });
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

const router = express.Router();

router.get('/testing', (req, res) => {
    res.send('<h1>Testing is working</h1>')
})

//==== shop ====//

router.get('/shops', (req, res) => {

	Shop.find()
	.then((shops) => {
	    return res.json(shops);
	});
})

router.get('/shops/:id', (req, res) => {

    Shop.findOne({id: req.params.id})
    // .populate('staff')
	.then((shops) => {
	    return res.json(shops);
	});
})

router.post('/shops', (req, res) => {

	let shop = new Shop();
	shop.id = Date.now();
	
	let data = req.body;
	Object.assign(shop,data);
	
	shop.save()
	.then((shop) => {
	  	return res.json(shop);
	});
});

router.delete('/shops/:id', (req, res) => {

	Shop.deleteOne({ id: req.params.id })
	.then(()=>res.json('deleted'))
});

router.put('/shops/:id', (req, res) => {

	Shop.findOne({id:req.params.id})
	.then((shop) => {
		var data = req.body;
		Object.assign(shop,data);
		return shop.save()	
	})
	.then((shop) => {
		return res.json(shop);
	});	

});

//==== staff ====//

router.get('/staffs', (req, res) => {

	Staff.find()
	.then((staff) => {
	    return res.json(staff);
	});
})

//==== photos ====//

router.post('/upload', (req, res) => {

	let files = Object.values(req.files);
	let uploadedFile = files[0];

	let newName = Date.now() + '_' + uploadedFile.name;

	uploadedFile.mv('public/'+ newName, function(){
		res.send(newName)
	})
});

//==== customers ====//



//==== waiting ====//

router.get('/waiting', (req, res) => {

	Waiting.find()
	.then((waiting) => {
	    return res.json(waiting);
	});
})

// router.get('/shops/:id', (req, res) => {

//     Shop.findOne({id: req.params.id})
//     // .populate('staff')
// 	.then((shops) => {
// 	    return res.json(shops);
// 	});
// })

router.post('/waiting', (req, res) => {

	let waiting = new Waiting();
	waiting.id = Date.now();
	
	let data = req.body;
	Object.assign(waiting,data);
	
	waiting.save()
	.then((waiting) => {
	  	return res.json(waiting);
	});
});

router.delete('/waiting/:id', (req, res) => {

	Waiting.deleteOne({ id: req.params.id })
	.then(()=>res.json('deleted'))
});

//==== cutting ====//

router.get('/cutting', (req, res) => {

	Cutting.find()
	.then((cutting) => {
	    return res.json(cutting);
	});
})

// router.get('/shops/:id', (req, res) => {

//     Shop.findOne({id: req.params.id})
//     // .populate('staff')
// 	.then((shops) => {
// 	    return res.json(shops);
// 	});
// })

router.post('/cutting', (req, res) => {

	let cutting = new Cutting();
	cutting.id = Date.now();
	
	let data = req.body;
	Object.assign(cutting,data);
	
	cutting.save()
	.then((cutting) => {
	  	return res.json(cutting);
	});
});

router.delete('/cutting/:id', (req, res) => {

	Cutting.deleteOne({ id: req.params.id })
	.then(()=>res.json('deleted'))
});







//==== admin access ====//

// router.get('/admin', (req, res) => {

// 	let password = 'password';
// 	let authenticate = req.password;
// 	if(authenticate){
// 		return {status: 200};
// 	}
// 	else{
// 		return {status: 404};
// 	}
// });

app.use('/api', router);

const apiPort = 4000;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));
