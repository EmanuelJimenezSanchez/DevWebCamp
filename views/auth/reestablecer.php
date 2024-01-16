<main class="auth">
  <h2 class="auth__heading"><?php echo $titulo; ?></h2>

  <P class="auth__texto">Coloca tu nueva contraseña</P>

  <?php require_once __DIR__ . '/../templates/alertas.php'; ?>

  <?php if ($token_valido) : ?>

    <form method="POST" class="formulario">
      <div class="formulario__campo">
        <label for="password" class="formulario__label">Nueva Contraseña</label>
        <input type="password" class="formulario__input" id="password" name="password">
      </div>

      <input type="submit" class="formulario__submit" value="Guardar Contraseña">
    </form>

  <?php endif; ?>

  <div class="acciones">
    <a href="/login" class="acciones__enlace">¿Ya tienes cuenta? Iniciar Sesión</a>
    <a href="/registro" class="acciones__enlace">¿Aún no tienes cuenta? Obtener una</a>
  </div>
</main>