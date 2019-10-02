<?php
$nombre = $_POST['nombre'];
$correo = $_POST['email'];
$tel = $_POST['contacto'];
$compania = $_POST['compania'];
$mensaje = $_POST['mensaje'];

mail('coffeecode@gmail.com', $nombre, $correo, $tel, $compania, $mensaje);

header("Location: index.html");

?>