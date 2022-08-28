
class Ponente {
    constructor(nombre,apellido,especialidad,nombreUsuario,contraseña){
        this.nombre=nombre;
        this.apellido=apellido;
        this.especialidad=especialidad;
        this.nombreUsuario=nombreUsuario;
        this.contraseña=contraseña;
    }

    obtenerNombre(){
        return this.nombre;
    }
    obtenerApellido(){
        return this.apellido;
    }
    obtenerEspecialidad(){
        return this.especialidad;
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
    establecerEspecialidad(especialidad){
        this.especialidad=especialidad;
    }
    establecerNombreUsuario(nombreUsuario){
        this.nombreUsuario=nombreUsuario;
    }
    establecerContraseña(contraseña){
        this.contraseña=contraseña;
    }
}