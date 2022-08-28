const express = require('express');
const authenticationController = require('../Presentation/Controller/authenticacionController.js');

const router = express.Router();

router.get('/login',authenticationController.loguear)
router.post('/',authenticationController.autenticar)
router.use(function(req, res, next) {
  if (!req.user)
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});
router.get('/logout', authenticationController.logout);

module.exports = router;
