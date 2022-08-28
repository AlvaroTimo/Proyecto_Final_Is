const express = require('express');

const administradorRouter = require('./administradorService.js');
const eventoRouter = require('./eventoService.js');
const ponenteRouter = require('./ponenteService.js');
const usuarioRouter = require('./usuarioService.js');
const authenticationRouter = require('./authentication.router.js')

function routerApi(app) {
  const router = express.Router();
  app.use('', router);
  router.use('/authentication',authenticationRouter)
  router.use('/administrador', administradorRouter);
  router.use('/evento', eventoRouter);
  router.use('/ponente', ponenteRouter);
  router.use('/usuario', usuarioRouter);
}

module.exports = routerApi;
