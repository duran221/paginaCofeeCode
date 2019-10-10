'use strict';
import * as util from './comunicacionBackend.js';

//función flecha auto-ejecutable
(document =>{
    //registre un evento que instancia la siguiente clase una vez se haya cargado el DOM
    document.addEventListener("DOMContentLoaded",evt =>{

        /**
         * se crea un nuevo objeto anónimo a partir de una clase anónima
            dicho objeto define la gestión de envío de correos
        */
        new class Envio {

            constructor() {
                //creando el evento asociado a el botón del formulario de contacto
                document.getElementById('form-btn-enviar').addEventListener('click', event => {
                    event.preventDefault();
                    this.enviarCorreo();
                });
            
            }

            /**
             * Captura y envia los datos al backend para ser enviados por correo electronico
             * 
             * @returns No retorna ningún elemento
             */
            enviarCorreo = () => {
                // se crea un objeto con los datos del formulario
                let nuevoCorreo = {
                    name: document.querySelector('#form-txt-nombre').value,
                    email: document.querySelector('#form-txt-email').value,
                    phone: document.querySelector('#form-txt-contacto').value,
                    company: document.querySelector('#form-txt-compania').value,
                    message: document.querySelector('#form-txt-mensaje').value

                    
                };
                let errores= this.validarDatos();
                //si  se encontraron errores, muéstrelos por pantalla
                if(errores){
                    toastr.error(errores,"Error");
                    return;
                }
                //inhabilite el botón mientras se envía la petición al backend                
                document.querySelector('#form-btn-enviar').className+= ' disabled';
                // se envían los datos del correo al Backend mediante una promesa retornando si el envío ha sido exitoso
                util.fetchData({
                    'method': 'POST',
                    'body': {
                        clase: 'Envio',
                        accion: 'enviarCorreo',
                        data: nuevoCorreo
                    }
                    
                //cuando la petición sea contestada, muestre un mensaje en pantalla
                }).then(data => {
                    
                    if (data.ok) {
                                        
                        //se limpian los campos de texto:
                        document.querySelector('#form-txt-nombre').value='';
                        document.querySelector('#form-txt-email').value='';
                        document.querySelector('#form-txt-contacto').value='';
                        document.querySelector('#form-txt-compania').value='';
                        document.querySelector('#form-txt-mensaje').value='';
                        
                        //muestra una notificación emergente indicando que el mensaje ha sido envíado
                        toastr.success("Su mensaje ha sido enviado","Éxito");
                        document.querySelector('#form-btn-enviar').className= 'btn btn-primary';
                        
                    } else {
                        throw new Error(data.mensaje);
                    }
                }).catch(error => {
                    toastr.error("Mensaje no enviado","Error");

                });
            };



            /**
             * Valida que todos los campos del formulario hayan sido diligenciados correctamente.
             * 
             * @returns String Con los posibles errores encontrados durante el analisis a los campos de texto.
             * 
             */
            validarDatos = () =>{

                //obteniendo referencia a los elementos:
                let name=document.querySelector('#form-txt-nombre').value;
                let email=document.querySelector('#form-txt-email').value;
                let phone=document.querySelector('#form-txt-contacto').value;
                let compania=document.querySelector('#form-txt-compania').value;
                let message=document.querySelector('#form-txt-mensaje').value;

                let errores='';
                //validando que el campo nombre no se encuentre vacio
                if(name.trim()==''){
                    errores+= '<br>Campo nombre no debe estar vacío';
                }
                //validando que el campo mensaje no se encuentre vacio
                if(message.trim()==''){
                    errores+= '<br>El campo mensaje no debe estar vacio';
                }

                if(message.length<15){
                    errores+= '<br>El campo mensaje debe contener mínimo 15 carácteres';
                }

                //Expresion regular que permite verificar si el campo correo electrónico se escribió de forma adecuada
                let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test(email) ){
                    errores+= '<br>El correo electronico introducido no es correcto';
                }
                return errores
            };
        }

    });

})(document);