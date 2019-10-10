<?php

//Importación modulo swiftmailer que permite gestionar el protocolo y conexión para envío de correos electrónicos
require_once '../servicios/swiftmailer/vendor/autoload.php';

    class Envio{

        private $mailer;
        private $user='cristianfernandoduran@gmail.com';
        private $password='3142160267';
        private $destino='coffeecode19@gmail.com';


        public function __construct(){

            // Create la capa de transporte SMTP con los datos necesarios para envío de correo a travéz de Gmail.
            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 587,'tls'))
            ->setUsername($this->user)
            ->setPassword($this->password);

            // Se crea una instancia de Mailer usando el protocolo de transporte descrito anteriormente
            $this->mailer = new Swift_Mailer($transport);
        
        }

        /**
         * Envía un correo electronico con los datos proporcionados desde el fronted
         * 
         * @access public
         * @param string $params: array asociativo que contiene los datos proporcionados desde el fronted
         * @return:  Una respuesta al Backend especificando si ha sido o no enviado el mensaje
         */
        public function enviarCorreo($params){
            
            //Extrae los datos enviados desde el Fronted
            extract($params);

            //Asigne los parametros  a variables locales
            $nombre= "Nombre: " . $data['name'];
            $correo= $data['email'];
            $telefono= "Telefono: " . $data['phone'];
            $compania= $data['company'];
            $mensaje= "Contenido: " . $data['message'];
            
            //Cree el objeto tipo Mensaje con los datos recibidos:
            $message = (new Swift_Message('Solicitud Informacion En Pagina Web'))
            ->setFrom([$this->user => $compania])
            ->setTo([$this->destino])
            ->setBody($nombre . " " . $telefono . " " . $correo . " " . $mensaje);

            //Si el mensaje es envíado con éxito, retorne un mensaje de confirmación:
            if($this->mailer->send($message)){
                
                echo json_encode(['ok' => TRUE, 'mensaje' => 'mensaje  enviado']);
                
            }else{
                echo json_encode(['ok' => FALSE, 'mensaje' => 'mensaje no enviado']);

            }

        }
    }
?>