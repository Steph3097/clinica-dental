const router = require('express').Router();

const User = require('../models/User');

router.get('/users/newUsers', (req, res) => {
    res.render('users/newUsers');
});

router.post('/users/newUser', async (req, res) => {
    const {title} = req.body;
    const errors = [];

    if(!title) {
        errors.push({text: 'Ingrese un nombre'});
    }
    if(errors.length > 0) {
        res.render('users/newUsers', {
            errors,
            title
        });
    } else {
       const newUser = new User({title});
       await newUser.save();
       res.redirect('/users')
    }
});

router.get('/users', async (req, res) => {
    await User.find()
      .then(documentos => {
        const contexto = {
            users: documentos.map(documento => {
            return {
                title: documento.title,
            }
          })
        }
        res.render('users/allUsers', {
 users: contexto.users }) 
      })
  })
module.exports = router;