
class Administrador{
    constructor(nombre,apellido,telefono,nombreUsuario,contraseña){
        this.nombre=nombre;
        this.apellido=apellido;
        this.telefono=telefono;
        this.nombreUsuario=nombreUsuario;
        this.contraseña=contraseña;
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
