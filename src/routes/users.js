const router = require('express').Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  console.log(req.body);

  // if(name != '') {
  //     if (password != confirm_password) {
  //       errors.push({ text: 'Las contrasenas no coinciden' });
  //     }
  
  //     if (password.length <= 8) {
  //       errors.push({ text: 'La contrasena debe ser mayor a 8 caracteres' });
  //     }
  // }
  // else {
  //   errors.push({text: 'Ingrese un dato valido'});
  // }
 
  // if(errors.length > 0) {
  //     res.render('users/signup', {
  //         errors,
  //         name,
  //         email,
  //         password,
  //         confirm_password
  //     });
  //   }  else {
  //       res.send('ok');
  //     }
});


module.exports = router;