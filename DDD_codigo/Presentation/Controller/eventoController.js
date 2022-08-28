const controller = {};

controller.mostrar = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_mostrarEvento()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_evento', {
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
    conn.query('CALL msp_insertarEvento(?,?,?,?)', [req.body.nombre,req.body.fecha,req.body.hora,req.body.lugar], (err, resultados) => {
        if (err) {
            res.json(err);
            res.end();
        }
        res.render('home', {
          alert: true,
          alertTitle: "Conexion exitosa",
          alertMessage: "Se ha registrado correctamente",
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
      conn.query('CALL msp_buscarEvento(?)',[req.session.id], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          res.render('update_evento', {
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

      conn.query('CALL msp_actualizarEvento(?,?,?,?)',[req.body.nombre,req.body.fecha,req.body.hora,req.body.lugar], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          conn.query('CALL msp_buscarEvento(?)',[req.session.id],(err,resultados)=>{
            if (err) {
              res.json(err);
              res.end();
            }
            res.render('update_evento', {
              data:resultados[0][0],
              alert: true,
              alertTitle: "Cambio exitoso",
              alertMessage: "Se realizo la actualizacion correctamente",
              alertIcon:'success',
              showConfirmButton: true,
              timer: 2000,
              ruta: `evento/update/${req.session.id}`
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
controller.filtroPorFiltro1 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_FiltrarEventoFiltro1()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_evento', {
            data: customers[0]
        });
    })
  });
};
controller.filtroPorFiltro2 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_FiltrarEventoFiltro2()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_evento', {
            data: customers[0]
        });
    })
  });
};

controller.filtroPorFiltro3 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_FiltrarEventoFiltro3()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_evento', {
            data: customers[0]
        });
    })
  });
};

controller.filtroPorFiltro4 = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_FiltrarEventoFiltro4()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_evento', {
            data: customers[0]
        });
    })
  });
};

module.exports = controller;
