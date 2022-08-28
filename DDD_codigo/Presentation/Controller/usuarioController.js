const controller = {};

controller.mostrar = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_mostrarUsuario()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_usuarios', {
            data: customers[0]
        });
    })
  });
};

controller.insertar = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      console.log("No se pudo conectar a la base de datos");
    }
    conn.query('CALL msp_insertarUsuario(?,?,?,?)', [req.body.nombre,req.body.apellido,req.body.nombreUsuario,req.body.contraseña], (err, resultados) => {
        if (err) {
            res.json(err);
            res.end();
        }
        res.render('home', {
          alert: true,
          alertTitle: "Conexion exitosa",
          alertMessage: "Te has registrado correctamente",
          alertIcon:'success',
          showConfirmButton: false,
          timer: 1500,
          ruta: ''
        });
    })
  });
};
controller.llenarDatos = (req, res) => {
  if (req.session.loggedin) {
    req.getConnection((err, conn) => {
      if (err) {
        console.log("No se pudo conectar a la base de datos");
      }
      conn.query('CALL msp_buscarUsuario(?)',[req.session.id], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          res.render('update_usuario', {
            data:resultados[0][0]
          });
      })
    });
  }
  else{
    res.render('home', {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Debes loguearte",
      alertIcon:'error',
      showConfirmButton: true,
      timer: 2000,
      ruta: ''
    });
  }
};
controller.actualizar = (req, res) => {
  if (req.session.loggedin) {
    req.getConnection((err, conn) => {
      if (err) {
        console.log("No se pudo conectar a la base de datos");
      }

      conn.query('CALL msp_actualizarUsuario(?,?,?,?)',[req.body.nombre,req.body.apellido,req.body.nombreUsuario,req.body.contraseña], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          conn.query('CALL msp_buscarUsuario(?)',[req.session.id],(err,resultados)=>{
            if (err) {
              res.json(err);
              res.end();
            }
            res.render('update_usuario', {
              data:resultados[0][0],
              alert: true,
              alertTitle: "Cambio exitoso",
              alertMessage: "Se realizo la actualizacion correctamente",
              alertIcon:'success',
              showConfirmButton: true,
              timer: 2000,
              ruta: `usuarios/update/${req.session.id}`
            });
          });
      })
    });
  }
  else{
    res.render('home', {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Debes loguearte",
      alertIcon:'error',
      showConfirmButton: true,
      timer: 2000,
      ruta: ''
    });
  }
};

module.exports = controller;