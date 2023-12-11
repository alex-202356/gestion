<?php
session_start();
$email = $_POST['email'];
$password = $_POST['password'];



$mysqli = new mysqli('localhost','id19942403_localhost','<>Alex*..123','id19942403_calzadosventa');
if ($mysqli->connect_errno) {
    echo "Falló la conexión a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

/* Sentencia preparada, etapa 1: preparación */
if ($sentencia = $mysqli->prepare("SELECT usuario, email, password FROM usuarios WHERE (usuario = ? AND password = ?) OR (email = ? AND password = ?)")) {
    if (!$sentencia->bind_param("ssss",$email,$password,$email,$password)) {
		echo "Falló la vinculación de parámetros: (" . $sentencia->errno . ") " . $sentencia->error;
	}

	if (!$sentencia->execute()) {
		echo "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error;
	}
	
	if (!($resultado = $sentencia->get_result())) {
		echo "Falló la obtención del conjunto de resultados: (" . $sentencia->errno . ") " . $sentencia->error;
	}else{
		if($resultado->num_rows ==1){
			$_SESSION["registrado"]=1;
			echo '<script>window.location.href="calzado.html";</script>';
		}else {
			echo '<script>window.location.href="index.html";</script>';
		}
		
	}
	
	
}

echo $mysqli->error;
?>