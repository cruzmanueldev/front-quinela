export function validateLogin(form){

    if(!form.tornid){
        return { response : false, message : 'El torneo es requerido'}
    }
    if(!form.usuusuario){
        return { response : false, message : 'El usuario es requerido'}
    }
    if(!form.usucontrasena){
        return { response : false, message : 'La contrasena es requerida'}
    }
    return { response: true, message : 'Datos validados' }
}