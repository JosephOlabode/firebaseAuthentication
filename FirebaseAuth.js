const express = require('express');
const FirebaseAuth = require('firebaseauth');
const firebaseThirdParty = new FirebaseAuth(process.env.FIREBASE_API_KEY);
const firebase = require('firebase');
const router = express.Router();


router.post('/google', (req, res) => {
    const token = req.body.token;

    firebaseThirdParty.loginWithGoogle(token, function(err, result) {
        if (err)
            console.log(err);
        else{
            console.log(result);
            res.send('Invalid Token');
        }

    });
});

router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('Am hit');
    const response = firebase.auth().createUserWithEmailAndPassword(email, password);
    response.then(user => {
        console.log(user);
        res.redirect('/login');
    })
});
router.post('/email-login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        if(user) {
            res.redirect('/home')
        }
        else{
            console.log('Invalid Email and/or password');
            res.redirect('/login');
        }
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;
