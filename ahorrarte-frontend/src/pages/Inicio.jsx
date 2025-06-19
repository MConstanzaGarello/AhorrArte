function Inicio() {
  return (
    <div>
      <header>
        <h1>Bienvenido a tu Analizador de Gastos</h1>
        <div className="botones-inicio">
          <a href="/login" className="btn">Iniciar Sesión</a>
          <a href="/registro" className="btn">Crear Cuenta</a>
        </div>
      </header>
    </div>
  );
}

export default Inicio;
