const controller = {};

controller.mostrar = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_mostrarAdministrador()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_admins', {
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
    conn.query('CALL msp_insertarAdministrador(?,?,?,?,?)', [req.body.nombre,req.body.apellido,req.body.telefono,req.body.nombreUsuario,req.body.contraseña], (err, resultados) => {
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
      conn.query('CALL msp_buscarAdministrador(?)',[req.session.id], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          res.render('update_admin', {
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

      conn.query('CALL msp_actualizarAdministrador(?,?,?,?,?)',[req.body.nombre,req.body.apellido,req.body.telefono,req.body.nombreUsuario,req.body.contraseña], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          conn.query('CALL msp_buscarAdministrador(?)',[req.session.id],(err,resultados)=>{
            if (err) {
              res.json(err);
              res.end();
            }
            res.render('update_admin', {
              data:resultados[0][0],
              alert: true,
              alertTitle: "Cambio exitoso",
              alertMessage: "Se realizo la actualizacion correctamente",
              alertIcon:'success',
              showConfirmButton: true,
              timer: 2000,
              ruta: `admins/update/${req.session.id}`
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