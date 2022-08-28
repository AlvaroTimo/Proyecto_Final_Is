
# Estilos de Programacion aplicados

## Cookbook

La lógica se divide en funciones, pero todas las funciones operan en compartido
variables globales.

Codigo: 

```javascript
var controller = {};

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
    else if(!req.body.nombre || !req.body.apellido ||!req.body.telefono || !req.body.nombreUsuario || !req.body.contraseña){
      res.render('home', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Datos llenados incorrectamente",
        alertIcon:'error',
        showConfirmButton: true,
        timer: 2000,
        ruta: ''
      });
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
      else if(!req.body.nombre || !req.body.apellido ||!req.body.telefono || !req.body.nombreUsuario || !req.body.contraseña){
        res.render('home', {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Datos llenados incorrectamente",
          alertIcon:'error',
          showConfirmButton: true,
          timer: 2000,
          ruta: ''
        });
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
```

``` javascript
const controller = {};

controller.mostrar = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('CALL msp_mostrarPonente()', (err, customers) => {
        if (err) {
            res.json(err);
        }
        res.render('show_ponentes', {
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
    else if(!req.body.nombre || !req.body.apellido ||!req.body.especialidad || !req.body.nombreUsuario || !req.body.contraseña){
      res.render('home', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Datos llenados incorrectamente",
        alertIcon:'error',
        showConfirmButton: true,
        timer: 2000,
        ruta: ''
      });
    }
    conn.query('CALL msp_insertarPonente(?,?,?,?,?,?)', [req.body.nombre,req.body.apellido,req.body.especialidad,req.body.nombreUsuario,req.body.contraseña], (err, resultados) => {
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
      conn.query('CALL msp_buscarPonente(?)',[req.session.id], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          res.render('update_ponente', {
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
      else if(!req.body.nombre || !req.body.apellido ||!req.body.especialidad || !req.body.nombreUsuario || !req.body.contraseña){
        res.render('home', {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Datos llenados incorrectamente",
          alertIcon:'error',
          showConfirmButton: true,
          timer: 2000,
          ruta: ''
        });
      }
      conn.query('CALL msp_actualizarPonente(?,?,?,?,?)',[req.body.nombre,req.body.apellido,req.body.especialidad,req.body.nombreUsuario,req.body.contraseña], (err, resultados) => {
          if (err) {
              res.json(err);
              res.end();
          }
          conn.query('CALL msp_buscarPonente(?)',[req.session.id],(err,resultados)=>{
            if (err) {
              res.json(err);
              res.end();
            }
            res.render('update_ponente', {
              data:resultados[0][0],
              alert: true,
              alertTitle: "Cambio exitoso",
              alertMessage: "Se realizo la actualizacion correctamente",
              alertIcon:'success',
              showConfirmButton: true,
              timer: 2000,
              ruta: `ponentes/update/${req.session.id}`
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
```
```javascript
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
```

## Pasivo - Agresivo

Cada procedimiento y función verifica la cordura de sus argumentos y se niega a continuar cuando los argumentos no son razonables, saltando fuera de la función.

Al llamar a otras funciones, las funciones del programa solo verifican si hay errores si están en condiciones de reaccionar de manera significativa.

El manejo de errores ocurre en los niveles más altos de las cadenas de llamadas de funciones, donde sea significativo hacerlo.

Codigo:

```javascript

controller.insertar = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.json(err);
      res.end();
    }
    else if(!req.body.nombre || !req.body.apellido || !req.body.nombreUsuario || !req.body.contraseña){
      res.render('home', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Datos llenados incorrectamente",
        alertIcon:'error',
        showConfirmButton: true,
        timer: 2000,
        ruta: ''
      });
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
```

```javascript
controller.actualizar = (req, res) => {
  if (req.session.loggedin) {
    req.getConnection((err, conn) => {
      if (err) {
        res.json(err);
        res.end();
      }
      else if(!req.body.nombre || !req.body.apellido || !req.body.nombreUsuario || !req.body.contraseña){
        res.render('home', {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Datos llenados incorrectamente",
          alertIcon:'error',
          showConfirmButton: true,
          timer: 2000,
          ruta: ''
        });
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
```
## Restful

REST es un estilo para aplicaciones interactivas basadas en red que subyace en la Web. Las principales restricciones de REST, que son:

Interactivo: extremo a extremo entre un agente activo (por ejemplo, una persona) y un backend

Separación entre Cliente (interfaz de usuario) y Servidor (almacenamiento de datos)

Sin estado, como en cliente--servidor sin estado: cada solicitud del cliente al servidor debe contener toda la información necesaria para que el servidor atienda la solicitud. El servidor no puede almacenar el contexto de la interacción. El estado de la sesión está en el cliente.

Interfaz uniforme: recursos que se crean y recuperan, identificadores de recursos y representación hipermedia que es el motor del estado de la aplicación

Codigo:

Interfaz de usuario:
```html

<%- include ('partials/_header')  %>
<section class="container">
    <div class="row mt-5">
        <div class="col-md-5">
            <div class="card">
                <div class="card-body">
                    <form method="POST" action="/products/update/<%=data.id%>">
                        <div class="form-group">
                            <input type="text" placeholder="Nombre" name="nombre" class="form-control" value="<%=data.nombre%>"/>
                        </div>
                        <div class="form-group">
                          <input type="text" placeholder="fecha" name="fecha" class="form-control" value="<%=data.costo%>"/>
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="hora" name="hora" class="form-control" value="<%=data.descripcion%>"/>
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="lugar" name="lugar" class="form-control" value="<%=data.cantidad%>"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<%- include ('partials/_footer')  %>

```

Server
```javascript
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
    else if(!req.body.nombre || !req.body.fecha ||!req.body.hora || !req.body.lugar){
      res.render('home', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Datos llenados incorrectamente",
        alertIcon:'error',
        showConfirmButton: true,
        timer: 2000,
        ruta: ''
      });
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
      else if(!req.body.nombre || !req.body.fecha ||!req.body.hora || !req.body.lugar){
        res.render('home', {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Datos llenados incorrectamente",
          alertIcon:'error',
          showConfirmButton: true,
          timer: 2000,
          ruta: ''
        });
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

```

```javascript
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
```