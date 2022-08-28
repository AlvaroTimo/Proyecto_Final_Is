const express = require('express');
const eventoController = require('../Presentation/Controller/eventoController.js');

const router = express.Router();

router.get('/', eventoController.mostrar);
router.post('/insert', eventoController.insertar);
router.get('/update', (req,res)=>{
  if(req.session.id)
    res.redirect(`/evento/update/${req.session.id}`)
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
router.get('/update/:id', eventoController.llenarDatos);
router.post('/update/:id', eventoController.actualizar);
router.get('/filter1', eventoController.filtroPorFiltro1);
router.get('/filter2', eventoController.filtroPorFiltro2);
router.get('/filter3', eventoController.filtroPorFiltro3);
router.get('/filter4', eventoController.filtroPorFiltro4);

module.exports = router;
