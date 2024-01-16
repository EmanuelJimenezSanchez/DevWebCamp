<?php

function debuguear($variable): string
{
  echo "<pre>";
  var_dump($variable);
  echo "</pre>";
  exit;
}
function s($html): string
{
  $s = htmlspecialchars($html);
  return $s;
}

function pagina_actual($path)
{
  return str_contains($_SERVER['PATH_INFO'] ?? '/', $path) ? true : false;
}

function is_auth()
{
  if (!isset($_SESSION)) {
    session_start();
  }

  return isset($_SESSION['nombre']) && !empty($_SESSION);
}

function is_admin()
{
  if (!isset($_SESSION)) {
    session_start();
  }

  return isset($_SESSION['admin']) && !empty($_SESSION['admin']);
}

function aos_animacion()
{
  $efectos = ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'flip-left', 'flip-right', 'zoom-in-up', 'zoom-in-down', 'zoom-out'];

  $efecto = $efectos[array_rand($efectos, 1)];

  echo ' data-aos= "' . $efecto . '" ';
}
