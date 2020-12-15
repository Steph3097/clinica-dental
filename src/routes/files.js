const router = require('express').Router();

const File = require('../models/File');
const Cliente = require('../models/Cliente');
const { isAuthenticated } = require('../helpers/auth')

router.get('/files/newFiles', async (req, res) => {
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

      res.render('files/newFiles', {cliente: contexto.cliente });
        });

});


router.post('/files/newFiles', async (req, res) => {
    var {id_client, name, genre, civil_status, blood_type} = req.body;
    const errors = [];
    const idCliente = req.body.id_client;
    const nombre = await Cliente.findById(idCliente)
  if (nombre) {
      name= nombre.name +' '+ nombre.lastName;
  }



    if(idCliente === 'any') {
        errors.push({text: 'Ingrese un cliente valido'});
    }
    var getRadioValuesGenre = req.body.genre;
    if (getRadioValuesGenre === 'Femenino') {
        type_user = 'Femenino';
    } else {
      type_user = 'Masculino';
    }

    var getRadioValuesCivilStatus = req.body.civil_status;
    if (getRadioValuesCivilStatus === 'Casado') {
        type_user = 'Casado';
    } else {
      type_user = 'Soltero';
    }

    if(errors.length > 0) {
        res.render('files/newFiles', {
            errors,
            name,
            genre,
            civil_status,
            blood_type
        });
    } else {
       const newFile = new File({id_client,name, genre, civil_status, blood_type});
       await newFile.save();
       req.flash('success_msg', 'Cliente agregado satisfactoriamente');
       res.redirect('/files')
    }
});

router.get('/files',  async (req, res) => {
    await File.find()
      .then(documentos => {
        const contexto = {
            file: documentos.map(documento => {
            return {
                id: documento._id,
                name: documento.name,
                genre: documento.genre,
                civil_status: documento.civil_status,
                blood_type: documento.blood_type,
            }
          })
        }
        res.render('files/allFiles', {
 file: contexto.file }) 
      });
  });

  router.get('/files/edit/:id', isAuthenticated,  async (req, res) => {

    const cliente = await Cliente.findById(req.params.id)
    .then(data =>{
        return {
            name: documento.name,
            lastName: documento.lastName,
            cedula: documento.cedula,
            nacimiento: documento.nacimiento,
            id:data.id
        }
    })
    res.render('files/editFiles',{cliente})
});

router.put('/files/editFiles/:id', isAuthenticated,  async (req, res) =>{
    const {name, lastName, cedula, nacimiento, id} = req.body;
     await Cliente.findByIdAndUpdate(req.params.id,{name, lastName, cedula, nacimiento, id});
     req.flash('success_msg', 'Cliente actualizado Satisfactoriamente');
     res.redirect('/files');
});

router.delete('/files/delete/:id', isAuthenticated,  async (req, res) =>{
     await Cliente.findByIdAndDelete(req.params.id);
     req.flash('success_msg', 'Cliente Eliminado satisfactoriamente');
     res.redirect('/files');
});

module.exports = router;