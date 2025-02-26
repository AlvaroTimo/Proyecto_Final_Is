
class Administrador{
    constructor(persona,telefono){
        this.nombre=persona.nombre;
        this.apellido=persona.apellido;
        this.telefono=telefono;
        this.nombreUsuario=persona.nombreUsuario;
        this.contraseña=persona.contraseña;
    }
    
    obtenerNombre(){
        return this.nombre;
    }
    obtenerApellido(){
        return this.apellido;
    }
    obtenerTelefono(){
        return this.telefono;
    }
    obtenerNombreUsuario(){
        return this.nombreUsuario;
    }
    obtenerContraseña(){
        return this.contraseña;
    }
    
    establecerNombre(nombre){
        this.nombre=nombre;
    }
    establecerApellido(apellido){
        this.apellido=apellido;
    }
    establecerTelefono(telefono){
        this.telefono=telefono;
    }
    establecerNombreUsuario(nombreUsuario){
        this.nombreUsuario=nombreUsuario;
    }
    establecerContraseña(contraseña){
        this.contraseña=contraseña;
    }
}
