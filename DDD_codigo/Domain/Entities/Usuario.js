
class Usuario{
    constructor(Persona){
        this.nombre=persona.nombre;
        this.apellido=persona.apellido;
        this.nombreUsuario=persona.nombreUsuario;
        this.contraseña=persona.contraseña;
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
