const express = require('express');
const ponenteController = require('../Presentation/Controller/ponenteController.js');

const router = express.Router();

router.get('/', ponenteController.mostrar);
router.post('/insert', ponenteController.insertar);
router.get('/update', (req,res)=>{
  if(req.session.id)
    res.redirect(`/ponente/update/${req.session.id}`)
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
router.get('/update/:id', ponenteController.llenarDatos);
router.post('/update/:id', ponenteController.actualizar);

module.exports = router;
