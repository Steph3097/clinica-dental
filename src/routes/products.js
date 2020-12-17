const router = require('express').Router();

const Product = require('../models/Product');

const { isAuthenticated } = require('../helpers/auth')

router.get('/products/newProducts', isAuthenticated, (req, res) => {
    res.render('products/newProducts');
});

router.post('/products/newProducts', isAuthenticated, async (req, res) => {
    const {product, cantidad, precio} = req.body;
    const errors = [];

    if(!product && !cantidad && !precio) {
        errors.push({text: 'Ingrese un dato valido'});
    }
    if(errors.length > 0) {
        res.render('products/newProducts', {
            errors,
            product,
            cantidad,
            precio
                });
    } else {
       const newProduct = new Product({product, cantidad, precio});
       await newProduct.save();
       req.flash('success_msg', 'Producto agregado satisfactoriamente');
       res.redirect('/products');
    }
});

router.get('/products', isAuthenticated,  async (req, res) => {
    await Product.find(req.params.id)
      .then(documentos => {
        const contexto = {
            product: documentos.map(documento => {
            return {
                id: documento._id,
                product: documento.product,
                cantidad: documento.cantidad,
                precio: documento.precio,
            }
          })
        }
        res.render('products/allProducts', {
 product: contexto.product }) 
      });
  });

  router.get('/products/edit/:id', isAuthenticated,  async (req, res) => {

    const product = await Product.findById(req.params.id)
    .then(data =>{
        return {
            id: data._id,
            product: data.product,
            cantidad: data.cantidad,
            precio: data.precio,
        }
    })
    res.render('products/editProducts',{product})
});

router.put('/products/editProducts/:id', isAuthenticated,  async (req, res) =>{
    const {product, cantidad, precio, id} = req.body;
     await Product.findByIdAndUpdate(req.params.id,{product, cantidad, precio, id});
     req.flash('success_msg', 'Producto actualizado Satisfactoriamente');
     res.redirect('/products');
});

router.delete('/products/delete/:id', isAuthenticated,  async (req, res) =>{
     await Product.findByIdAndDelete(req.params.id);
     req.flash('success_msg', 'Producto Eliminado satisfactoriamente');
     res.redirect('/products');
});

module.exports = router;