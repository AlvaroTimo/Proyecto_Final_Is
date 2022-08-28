const express = require('express');
const administradorController = require('../Presentation/Controller/administradorController.js');

const router = express.Router();

router.get('/', administradorController.mostrar);
router.post('/insert', administradorController.insertar);
router.get('/update', (req,res)=>{
  if(req.session.id)
    res.redirect(`/administrador/update/${req.session.id}`)
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
router.get('/update/:id', administradorController.llenarDatos);
router.post('/update/:id', administradorController.actualizar);

module.exports = router;
