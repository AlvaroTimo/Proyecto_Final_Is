const controller = {};

controller.autenticar = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario WHERE usuario = ?',[req.body.user], (err, resultados) => {
        if (err) {
            res.json(err);
        }
        if(resultados.length==0 || req.body.password!=resultados[0].contrasena){
          res.render('home', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "USUARIO y/o PASSWORD incorrectas",
            alertIcon:'error',
            showConfirmButton: true,
            timer: false,
            ruta: ''
          });
        }
        else{
          const _id= resultados[0].id;
          conn.query('SELECT * FROM Administrador a INNER JOIN Usuario p ON a.id=p.id WHERE p.id = ?',[_id], (err, resultados)=>{
            if(resultados.length==0){
              req.session.loggedin = true;
              req.session.name = "cliente";
              req.session.id = _id;
              res.render('home', {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "¡LOGIN CORRECTO!",
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'products'
              })
              res.end()
            }
            else{
              req.session.loggedin = true;
              req.session.name = "admin";
              req.session.id = _id;
              res.render('home', {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "¡LOGIN CORRECTO!",
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'products'
              })
            }
            res.end();
          })
        }
    })
  });
};
controller.loguear = (req, res) => {
  res.render('login');
};

controller.logout = function (req, res) {
  req.session = null;
  res.redirect('/')
}

module.exports = controller;
