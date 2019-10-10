<?php

new Controlador();

class Controlador {

    public function __construct() {

        $contenido = '';
        $this->leerConfiguracion();
        //intente interpretar y ejecutar la petición mandada desde el fronted
        try {
            //averigue el tipo de contenido que ha llegado desde el Fronted
            $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
            
            //si el contenido viene codificado en formato JSON,decodifiquelo
            if ($contentType === "application/json") {
                // recibir el string postdata como venga
                $contenido = trim(file_get_contents("php://input"));
                // decodificarlo a JSON
                $post = json_decode($contenido, true);
            } 
            //ejecute la petición mandada desde el Fronted
            $this->ejecutar($post);
           
        } catch (Exception $e) {

            echo json_encode(["ok" => FALSE, "mensaje" => $e->getMessage()]);
        }
    }

    /**
     * Función generica que instancia y ejecuta una funcionalidad dado como parametros la Clase y La función.
     * 
     * @access private
     * @return None
     */
    private function ejecutar($param) {

        error_log(print_r($param, 1));
        extract($param);
        include_once "../modelo/$clase.php";
        $obj = new $clase();
        $obj->{$accion}($param);
    }


    /**
     * Define las configuraciones iniciales para manejo de rutas de aplicación, zona horaria, etc, etc
     * 
     * @access private
     * @return No retorno
     */
    private function leerConfiguracion() {

        //defino una constante con la ruta de la aplicacion (usada para mandar errores a el log)
        define("PATH_APP", $this->rutaAplicacion());

        // iniciar la sesión, solo si no existe. Esto debe ir antes de enviar cualquier cosa al navegador
        date_default_timezone_set('America/Bogota');
        ini_set('display_errors', 'Off');
        ini_set('log_errors', 'On');

        // --------------------------------------------------------------------------------------
        // IMPORTANTE: asigne una nueva ruta de lecto/escritura para el siguiente archivo de control de errores
        ini_set('error_log', PATH_APP . 'demotdb.log');

    }


    /**
     * Establece la ruta global donde se encuentra la aplicación (usado para la generación de errores en el log)
     * 
     * Genera la ruta que debe seguir un error generado para ser almacenado en el log
     * En cualquier equipo donde se encuentra instalada esta aplicación.accent-1
     * 
     * @access private
     * @return string con la ruta donde se encuentra almacenada la aplicación
     */
    private function rutaAplicacion() {
        $rutaFachada = str_replace("\\", "/", dirname(__FILE__));
        $pos = strrpos($rutaFachada, "/") + 1;
        return substr($rutaFachada, 0, $pos);
    }



}
