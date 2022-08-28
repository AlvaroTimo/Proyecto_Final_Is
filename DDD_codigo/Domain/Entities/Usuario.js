
class Usuario{
    constructor(nombre,apellido,nombreUsuario,contraseña){
        this.nombre=nombre;
        this.apellido=apellido;
        this.nombreUsuario=nombreUsuario;
        this.contraseña=contraseña;
    }
    
    obtenerNombre(){
        return this.nombre;
    }
    obtenerApellido(){
        return this.apellido;
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
    }å
    establecerNombreUsuario(nombreUsuario){
        this.nombreUsuario=nombreUsuario;
    }
    establecerContraseña(contraseña){
        this.contraseña=contraseña;
    }

}
