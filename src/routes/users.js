const router = require('express').Router();

const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/bienvenida/welcome',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  var { name, email, password, confirm_password, type_user } = req.body;
  const errors = [];

  if (name.length <= 0) {
    errors.push({ text: 'Ingrese un dato valido' });

  }
  if (password != confirm_password) {
    errors.push({ text: 'Las contrasenas no coinciden' });
  }

  if (password.length < 8) {
    errors.push({ text: 'La contrasena debe ser mayor a 8 caracteres' });
  }

  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
      password,
      confirm_password,
      type_user
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'El Correo ya Esta en uso');
      res.redirect('/users/signup');
    } else {
      var getRadioValues = req.body.type_user;
      if (getRadioValues === 'administrador') {
          type_user = 'administrador';
      } else if (getRadioValues === 'Secretaria') {
        type_user = 'secretaria';
      } else {
        type_user = 'dentista';
      }
      const newUser = new User({ name, email, password, type_user });
      newUser.password = await newUser.encryptPassword(password);

      await newUser.save();
      req.flash('success_msg', 'Ya estas registrado!');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})


module.exports = router;