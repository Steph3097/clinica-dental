const router = require('express').Router();

const Cita = require('../models/Cita');
const Cliente = require('../models/Cliente');
const { isAuthenticated } = require('../helpers/auth')

router.get('/citas/newCitas', isAuthenticated,  async (req, res) => {
    await Cliente.find()
    .then(documentos => {
      const contexto = {
          cliente: documentos.map(documento => {
          return {
              id: documento._id,
              name: documento.name,
              lastName: documento.lastName,
              cedula: documento.cedula,
              nacimiento: documento.nacimiento,
          }
        })
      }

      res.render('citas/newCitas', {cliente: contexto.cliente });
        });

});


router.post('/citas/newCitas', isAuthenticated ,  async (req, res) => {
    var {id_client, name, fecha, detalle, odontologo} = req.body;
    const errors = [];
    const idCliente = req.body.id_client;
    const nombre = await Cliente.findById(idCliente)
  if (nombre) {
      name= nombre.name +' '+ nombre.lastName;
  }



    if(idCliente === 'any') {
        errors.push({text: 'Ingrese un cliente valido'});
    }
    if(errors.length > 0) {
        res.render('citas/newCitas', {
            errors,
            name,
            genre,
            civil_status,
            blood_type
        });
    } else {
       const newCita = new Cita({id_client, name, fecha, detalle, odontologo});
       await newCita.save();
       req.flash('success_msg', 'Cita agregado satisfactoriamente');
       res.redirect('/citas')
    }
});

router.get('/citas', isAuthenticated,  async (req, res) => {
    await Cita.find()
      .then(documentos => {
        const contexto = {
            citas: documentos.map(documento => {
            return {
                id: documento._id,
                name: documento.name,
                fecha: documento.fecha,
                detalle: documento.detalle,
                odontologo: documento.odontologo,
            }
          })
        }
        res.render('citas/allCitas', {
 citas: contexto.citas }) 
      });
  });

  router.get('/citas/edit/:id', isAuthenticated,   async (req, res) => {
    const cita = await Cita.findById(req.params.id)
      .then(data =>{
          return {
            id: data._id,
            name: data.name,
            fecha: data.fecha,
            detalle: data.detalle,
            odontologo: data.odontologo,
          }
      });
      res.render('citas/editCitas',{cita});

});

router.put('/citas/editCitas/:id', isAuthenticated,  async (req, res) =>{
    const {fecha, detalle, odontologo} = req.body;
     await Cita.findByIdAndUpdate(req.params.id,{fecha, detalle, odontologo});
     req.flash('success_msg', 'Cita actualizado Satisfactoriamente');
     res.redirect('/citas');
});

router.delete('/citas/delete/:id', isAuthenticated, async (req, res) =>{
     await Cita.findByIdAndDelete(req.params.id);
     req.flash('success_msg', 'Cita Eliminado satisfactoriamente');
     res.redirect('/citas');
});

module.exports = router;