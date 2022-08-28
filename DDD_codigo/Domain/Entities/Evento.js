
class Evento{
    constructor(nombre,fecha,hora,lugar){
        this.nombre=nombre;
        this.fecha=fecha;
        this.hora=hora;
        this.lugar=lugar;
    }
    obtenerNombre(){
        return this.nombre;
    }
    obtenerFecha(){
        return this.fecha;
    }
    obtenerHora(){
        return this.hora;
    }
    obtenerLugar(){
        return this.lugar;
    }

    establecerNombre(nombre){
        this.nombre=nombre;
    }
    establecerFecha(fecha){
        this.fecha=fecha;
    }
    establecerHora(hora){
        this.hora=hora;
    }
    establecerLugar(lugar){
        this.lugar=lugar;
    }

}
