const express = require('express');
const usuarioController = require('../Presentation/Controller/usuarioController.js');

const router = express.Router();

router.get('/', usuarioController.mostrar);
router.post('/insert', usuarioController.insertar);
router.get('/update', (req,res)=>{
  if(req.session.id)
    res.redirect(`/usuario/update/${req.session.id}`)
  else{
    res.render('home', {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Deber loguearte",
      alertIcon:'error',
      showConfirmButton: true,
      timer: false,
      ruta: ''
    });
  }
});
router.get('/update/:id', usuarioController.llenarDatos);
router.post('/update/:id', usuarioController.actualizar);

module.exports = router;
