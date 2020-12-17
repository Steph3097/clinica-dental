const router = require('express').Router();

const Cliente = require('../models/Cliente');

const { isAuthenticated } = require('../helpers/auth')

router.get('/clientes/newClients', isAuthenticated, (req, res) => {
    res.render('clientes/newClients');
});

router.post('/clientes/newClients', isAuthenticated, async (req, res) => {
    const {name, lastName, cedula, nacimiento} = req.body;
    const errors = [];

    if(!name && !lastName && !cedula && !nacimiento) {
        errors.push({text: 'Ingrese un dato valido'});
    }
    if(errors.length > 0) {
        res.render('clientes/newClients', {
            errors,
            name,
            lastName,
            cedula,
            nacimiento
        });
    } else {
       const newClient = new Cliente({name, lastName, cedula, nacimiento});
       newClient.user = req.user.id;
       await newClient.save();
       req.flash('success_msg', 'Cliente agregado satisfactoriamente');
       res.redirect('/clientes')
    }
});

router.get('/clientes', isAuthenticated,  async (req, res) => {
    await Cliente.find({user: req.user.id})
      .then(documentos => {
        const contexto = {
            cliente: documentos.map(documento => {
            return {
                id: documento._id,
                name: documento.name,
                lastName: documento.apellido,
                cedula: documento.cedula,
                nacimiento: documento.nacimiento,
            }
          })
        }
        res.render('clientes/allClients', {
 cliente: contexto.cliente }) 
      });
  });

  router.get('/clientes/edit/:id', isAuthenticated,  async (req, res) => {

    const cliente = await Cliente.findById(req.params.id)
    .then(data =>{
        return {
            name: data.name,
            lastName: data.lastName,
            cedula: data.cedula,
            nacimiento: data.nacimiento,
            id:data.id
        }
    })
    res.render('clientes/editClients',{cliente})
});

router.put('/clientes/editClients/:id', isAuthenticated,  async (req, res) =>{
    const {name, lastName, cedula, nacimiento, id} = req.body;
     await Cliente.findByIdAndUpdate(req.params.id,{name, lastName, cedula, nacimiento, id});
     req.flash('success_msg', 'Cliente actualizado Satisfactoriamente');
     res.redirect('/clientes');
});

router.delete('/clientes/delete/:id', isAuthenticated,  async (req, res) =>{
     await Cliente.findByIdAndDelete(req.params.id);
     req.flash('success_msg', 'Cliente Eliminado satisfactoriamente');
     res.redirect('/clientes');
});

module.exports = router;