const router = require('express').Router();

const Factura = require('../models/Factura');
const Product = require('../models/Product');

const { isAuthenticated } = require('../helpers/auth')

router.get('/facturas/newFacturas',  async (req, res) => {
    await Product.find()
    .then(documentos => {
      const contexto = {
          producto: documentos.map(documento => {
          return {
              id: documento._id,
              product: documento.product,
              cantidad: documento.cantidad,
              precio: documento.precio,
          }
        })
      }

      res.render('facturas/newFacturas', {producto: contexto.producto });
      console.log({producto: contexto.producto});
        });

});


router.post('/facturas/newFacturas', isAuthenticated ,  async (req, res) => {
    var facturas = new Factura();
    var {id_producto, nombre_producto, cantidad_producto, subtotal, total} = req.body;
    const errors = [];
    facturas.id_producto = [];
    const producto = await Product.findById(id_producto);

    if (!id_producto && !nombre_producto && !cantidad_producto && !subtotal && !total ) {
        errors.push({text: 'Ingrese un dato valido'})
    }
  if (producto) {
      nombre_producto = producto.name;
      cantidad_producto = parseInt(req.body.cantidad_producto);

      var calculoSubtotal = producto.precio * cantidad_producto;
    
      subtotal = calculoSubtotal;
      var calculoImpuesto = (subtotal * 0.13) + subtotal;
      total = calculoImpuesto;
  }

    if(errors.length > 0) {
        res.render('facturas/newFacturas', {
            errors,
            id_producto,
            nombre_producto,
            cantidad_producto,
            subtotal,
            total
        });
    } else {
       const newFactura = new Factura({id_producto, nombre_producto, cantidad_producto, subtotal, total});
       await newFactura.save();
       req.flash('success_msg', 'Factura agregado satisfactoriamente');
       res.redirect('/facturas')
    }
});

router.get('/files', isAuthenticated,  async (req, res) => {
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

  router.get('/files/edit/:id', isAuthenticated,   async (req, res) => {
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

      res.render('files/editFiles', {cliente: contexto.cliente });
        });
    const file = await File.findById(req.params.id)
    .then(data =>{
        return {
            name: data.name,
            genre: data.genre,
            civil_status: data.civil_status,
            blood_type: data.blood_type,
            id:data.id
        }
    });
    res.render('files/editFiles',{file});
});

router.put('/files/editFiles/:id', isAuthenticated,  async (req, res) =>{
    const {name, genre, civil_status, blood_type} = req.body;
     await File.findByIdAndUpdate(req.params.id,{name, genre, civil_status, blood_type, id});
     req.flash('success_msg', 'Cliente actualizado Satisfactoriamente');
     res.redirect('/files');
});

router.delete('/files/delete/:id', isAuthenticated, async (req, res) =>{
     await File.findByIdAndDelete(req.params.id);
     req.flash('success_msg', 'Expediente Eliminado satisfactoriamente');
     res.redirect('/files');
});

module.exports = router;