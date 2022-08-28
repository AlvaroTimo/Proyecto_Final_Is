
# Estilos de Programacion aplicados

## Cookbook --- DDD_codigo/Presentation/Controller/administradorController.js

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

## Pasivo - Agresivo --- DDD_codigo/Presentation/Controller/usuarioController.js

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
### --- DDD_codigo/Presentation/Controller/eventoController.js
### --- /DDD_codigo/Domain/Services/EventoService.js
### --- /DDD_codigo/Presentation/View/update_evento.ejs

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


# Codificacion legible aplicado
## Esquema de Nomenclatura Consistente

Tener diferentes opciones crea una situación similar a los estilos de sangrado, como mencioné anteriormente. Si un proyecto existente sigue una cierta convención, debería seguirla. Además, algunas plataformas de lenguaje tienden a utilizar cierto esquema de nomenclatura. Por ejemplo, en Java, la mayoría del código usa nombres en camelCase, mientras que en PHP la mayoría utiliza guiones bajos.

```javascript
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

```
En este caso estoy usando camelCase

##  Capitalizar palabras especiales en SQL --- DDD_codigo/Presentation/Controller/autenticacionController.js

A pesar de que las palabras especiales y los nombres de funciones de SQL no distinguen entre mayúsculas y minúsculas, es una práctica común escribirlas en mayúsculas para distinguirlas de sus nombres de tabla y columna.

```javascript

controller.autenticar = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario WHERE usuario = ?',[req.body.user], (err, resultados) => {
        if (err) {
            res.json(err);
        }
        else{
          const _id= resultados[0].id;
          conn.query('SELECT * FROM Administrador a INNER JOIN Usuario p ON a.id=p.id WHERE p.id = ?',[_id], (err, resultados)=>{
            if(resultados.length==0){
              /*...*/
            }
            else{
              /*...*/
            }
            res.end();
          })
        }
    })
  });
};
```

##  Sintaxis Alterna Dentro de las Plantillas --- DDD_codigo/Presentation/View/mostrar_evento.ejs

Usted puede elegir no usar un elegante motor de plantilla y en lugar de esto utilizar PHP en línea simple en sus archivos de plantilla. Esto no viola necesariamente la "Separación de Código y Datos", siempre y cuando el código en línea esté directamente relacionado con la salida y sea legible. En este caso usted debería considerar el uso de la sintaxis alterna para las estructuras de control.

Esto le permite evitar un sinnúmero de llaves. Además, el código se ve y se siente similar a la forma en que HTML está estructurado y sangrado.
```html
<%- include ('partials/_header') %>
<section class="container">
  <div class="row mt-5">
      <div class="col-md-7">
          <table class="table table-bordered table-hover">
              <thead>
                  <tr>
                      <td>N°</td>
                      <td>Nombre</td>
                      <td>Fecha</td>
                      <td>Hora</td>
                      <td>Lugar</td>
                  </tr>
              </thead>

              <tbody>
                  <% if (data) { %>
                      <% for(var i = 0; i < data.length; i++) { %>
                          <tr>
                              <td>
                                  <%= i+1 %>
                              </td>
                              <td>
                                  <%= data[i].nombre %>
                              </td>
                              <td>
                                <%= data[i].fecha %>
                            </td>
                              <td>
                                <%= data[i].hora %>
                              </td>
                              <td>
                                <%= data[i].lugar %>
                              </td>
                          </tr>
                      <% } %>
                  <% } %>
              </tbody>
          </table>
      </div>
  </div>
</section>
<%- include ('partials/_footer')  %>
```

## Sangrado Consistente --- DDD_codigo/Presentation/Controller/usuarioController.js

Es una buena idea mantener su estilo de sangrado de una manera coherente.

```javascript
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
```

## Agrupación de Código --- DDD_codigo/Services/index.js

Casi siempre ciertas tareas requieren unas pocas líneas de código. Es una buena idea mantener estas tareas dentro de bloques separados de código, con algunos espacios entre ellos.

La adición de un comentario al principio de cada bloque de código también enfatiza la separación visual.

```javascript
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const dotenv = require('dotenv');
const session = require('cookie-session');
const cors = require('cors');

const routerApi = require('./Domain/Services');
const app = express();
const port = process.env.PORT || 3000;

//configuraciones
dotenv.config({ path: '../env/.env'});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(express.json());
app.use(cors())
app.use(
  myConnection(
    mysql,
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//rutas
routerApi(app);
app.get('/', (req, res) => {
  res.render('home');
});
app.use(express.static(path.join(__dirname,'public')))

//iniciar servidor
app.listen(port, () => {
  console.log('Mi port ' + port);
});
```

## Principio DRY --- DDD_codigo/Presentation/View/insert_evento.ejs

DRY significa Don't Repeat Yourself - No se Repita a sí Mismo. También conocido como DIE: Duplication is Evil - Duplicar es Maligno.

El propósito de la mayoría de las aplicaciones (o de los computadores en general) es automatizar tareas repetitivas. Este principio se debe mantener en todo el código, incluso en aplicaciones web. El mismo pedazo de código no debe repetirse una y otra vez.

```html
<%- include ('partials/_header')  %>
    <section class="container">
        <div class="row mt-5">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form method="POST">
                            <div class="form-group">
                                <input type="text" placeholder="Nombre" name="nombre" class="form-control" required/>
                            </div>
                            <div class="form-group">
                              <input type="text" placeholder="Fecha" name="Fecha" class="form-control" required/>
                            </div>
                            <div class="form-group">
                              <input type="text" placeholder="Hora" name="hora" class="form-control" required/>
                            </div>
                            <div class="form-group">
                              <input type="text" placeholder="lugar" name="lugar" class="form-control" required/>
                            </div>
                            <button type="submit" class="btn btn-primary">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
<%- include ('partials/_footer')  %>
```
Estamos evitando copiar y pegar los encabezados en las vistas

## Evite la Anidación Profunda
Demasiados niveles de anidamiento pueden hacer que el código sea más difícil de leer y seguir.

```javascript
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

```


## Organización de Archivos y Carpetas
Técnicamente, podría escribir el código de una aplicación completo dentro de un solo archivo. Pero eso resultaría en una pesadilla para leer y mantener.

Uno de los mejores enfoques es bien sea utilizar un framework o imitar su estructura de carpetas. 

> Estamos usando DDD para la estructura del proyecto como se puede ver en las carpetas del repositorio


## Nombres Temporales Consistentes --- DDD_codigo/Services/index.js

Normalmente, las variables deben ser descriptivas y contener una o más palabras. Pero esto no necesariamente aplica a variables temporales. Estas pueden ser tan cortas como de un solo carácter.

Es una buena práctica utilizar nombres coherentes para sus variables temporales que tengan el mismo tipo de rol. Estos son algunos de los ejemplos que tiendo a utilizar en mi código:

```javascript
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const dotenv = require('dotenv');
const session = require('cookie-session');
const cors = require('cors');
```