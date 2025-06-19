import { useState } from "react";


function Panel() {
  const [transacciones, setTransacciones] = useState([]);
  const [categorias, setCategorias] = useState(["comida", "transporte", "otros"]);
  const [presupuestos, setPresupuestos] = useState([]);

  const [tipo, setTipo] = useState("gasto");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("comida");
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const [categoriaPresupuesto, setCategoriaPresupuesto] = useState("comida");
  const [montoPresupuesto, setMontoPresupuesto] = useState("");

  const handleTransaccion = (e) => {
    e.preventDefault();

    if (fecha === "" || monto === "" || categoria === "") {
      alert("Por favor, completá todos los campos.");
      return;
    }

    const nueva = {
      tipo,
      fecha,
      monto: parseFloat(monto),
      categoria,
    };

    setTransacciones([...transacciones, nueva]);

    // Limpiar
    setFecha("");
    setMonto("");
    setCategoria("comida");
    setTipo("gasto");
  };

  const handleNuevaCategoria = (e) => {
    e.preventDefault();
    const nombre = nuevaCategoria.trim().toLowerCase();
    if (nombre === "" || categorias.includes(nombre)) {
      alert("Categoría inválida o ya existente.");
      return;
    }

    setCategorias([...categorias, nombre]);
    setNuevaCategoria("");
    alert("¡Categoría creada con éxito!");
  };

  const handlePresupuesto = (e) => {
    e.preventDefault();

    const yaExiste = presupuestos.find(p => p.categoria === categoriaPresupuesto);
    if (yaExiste) {
      alert("Ya definiste un presupuesto para esa categoría.");
      return;
    }

    setPresupuestos([...presupuestos, {
      categoria: categoriaPresupuesto,
      monto: parseFloat(montoPresupuesto)
    }]);

    setMontoPresupuesto("");
  };

  return (
    <main className="panel-container">

      {/* Registrar transacción */}
      <section className="card">
        <h2>Registrar gasto o ingreso</h2>
        <form onSubmit={handleTransaccion}>
          <label htmlFor="tipo">Tipo</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="gasto">Gasto</option>
            <option value="ingreso">Ingreso</option>
          </select>

          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <label htmlFor="monto">Monto</label>
          <input
            type="number"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />

          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((c, i) => (
              <option key={i} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>

          <button type="submit" className="btn">Agregar</button>
        </form>
      </section>

      {/* Crear categoría */}
      <section className="card">
        <h2>Crear nueva categoría</h2>
        <form onSubmit={handleNuevaCategoria}>
          <label htmlFor="nueva-categoria">Nombre</label>
          <input
            type="text"
            id="nueva-categoria"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            required
          />
          <button type="submit" className="btn">Crear categoría</button>
        </form>
      </section>

      {/* Definir presupuesto */}
      <section className="card">
        <h2>Definir presupuesto por categoría</h2>
        <form onSubmit={handlePresupuesto}>
          <label htmlFor="categoria-presupuesto">Categoría</label>
          <select
            id="categoria-presupuesto"
            value={categoriaPresupuesto}
            onChange={(e) => setCategoriaPresupuesto(e.target.value)}
          >
            {categorias.map((c, i) => (
              <option key={i} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>

          <label htmlFor="monto-presupuesto">Monto mensual</label>
          <input
            type="number"
            id="monto-presupuesto"
            value={montoPresupuesto}
            onChange={(e) => setMontoPresupuesto(e.target.value)}
            required
          />

          <button type="submit" className="btn">Guardar presupuesto</button>
        </form>
      </section>

      {/* Historial */}
      <section className="card">
        <h2>Historial de transacciones</h2>
        <ul className="historial">
          {transacciones.map((t, i) => (
            <li key={i}>
              {t.tipo === "gasto" ? "📉" : "📈"} {t.tipo} en {t.categoria}: ${t.monto} - {t.fecha}
            </li>
          ))}
        </ul>
      </section>

      {/* Presupuestos definidos */}
      <section className="card">
        <h2>Presupuestos definidos</h2>
        <ul className="historial">
          {presupuestos.map((p, i) => (
            <li key={i}>
              📊 {p.categoria}: ${p.monto}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Panel;