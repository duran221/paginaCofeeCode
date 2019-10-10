'use strict';


/**
 * permite obtener una promesa con recursos de forma asíncrona por el canal HTTP
 * @param {String} url La dirección a la que se envía la petición.
 * @param {Object} data Opcional. Un objeto para enviar argumentos.
 * @returns JSON con la respuesta obtenida por el Backend
 */
export async function fetchData(data = {}) {
    //incluir un paso de parametros POST en caso de estar ausente:
    if (!('method' in data)) {
        data.method = 'POST';
    }
    //establecer el tipo de contenido como JSON:
    if (!('headers' in data)) {
        data.headers = {
            'Content-Type': 'application/json'
        };
    }

    if ('body' in data) {
        //convertir a JSON los datos enviados en el formulario:
        data.body = JSON.stringify(data.body);
    }

    //envíe una petición asincrona a el controlador con las funcionalidades que se decea hacer
    const respuesta = await fetch('./controlador/fachada.php', data);

    if (!respuesta.ok) {
        throw new Error(`Error al cargar ${url}: ${respuesta.status} - ${respuesta.statusText}`); // <<<<<<<<<<<<<<<<<<<<<<<<
    }

    return await respuesta.json();
}

