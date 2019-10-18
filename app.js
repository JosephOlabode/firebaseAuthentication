const  express = require('express');
const firebase = require('firebase');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
require('firebase/auth');
require('firebase/database');
/*const auth = require('./auth');*/
const firebaseAuth = require('./FirebaseAuth');


firebase.initializeApp(config);

const app = express();
const port = process.env.port || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/*app.use('/api/auth', auth);*/
app.use('/api/auth', firebaseAuth);


app.listen(port, () => {
    console.log('listening on ' + port);
});


