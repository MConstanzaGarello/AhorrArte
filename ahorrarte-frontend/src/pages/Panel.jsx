import { useState, useEffect } from "react";
import { API_URL } from "../config";

function Panel() {
  const [transacciones, setTransacciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);

  const [tipo, setTipo] = useState("gasto");
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");

  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const [categoriaPresupuesto, setCategoriaPresupuesto] = useState("");
  const [montoPresupuesto, setMontoPresupuesto] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      const headers = { Authorization: token };

      const [resT, resC, resP] = await Promise.all([
        fetch(`${API_URL}/api/transacciones`, { headers }),
        fetch(`${API_URL}/api/categorias`, { headers }),
        fetch(`${API_URL}/api/presupuestos`, { headers }),
      ]);

      const trans = await resT.json();
      const cats = await resC.json();
      const presup = await resP.json();

      setTransacciones(trans);
      setCategorias(cats.map(c => c.nombre));
      setPresupuestos(presup);

      if (cats.length > 0) {
        setCategoria(cats[0].nombre);
        setCategoriaPresupuesto(cats[0].nombre);
      }
    };

    fetchData();
  }, [token]);

  const handleTransaccion = async (e) => {
    e.preventDefault();

    if (!fecha || !monto || !categoria) {
      alert("Completá todos los campos.");
      return;
    }

    const nueva = {
      tipo,
      fecha,
      monto: parseFloat(monto),
      categoria,
    };

    try {
      const res = await fetch(`${API_URL}/api/transacciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(nueva),
      });

      if (!res.ok) throw new Error("Error al guardar");

      const guardada = await res.json();
      setTransacciones([...transacciones, guardada]);

      // Limpiar formulario
      setFecha("");
      setMonto("");
      setCategoria(categorias[0]);
      setTipo("gasto");
    } catch (err) {
      alert("Error al guardar transacción");
    }
  };

  const handleNuevaCategoria = async (e) => {
    e.preventDefault();
    const nombre = nuevaCategoria.trim().toLowerCase();
    if (!nombre || categorias.includes(nombre)) {
      alert("Categoría inválida o ya existe.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ nombre }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      const creada = await res.json();
      setCategorias([...categorias, creada.nombre]);
      setNuevaCategoria("");
      alert("¡Categoría creada con éxito!");
    } catch {
      alert("Error al crear categoría");
    }
  };

  const handlePresupuesto = async (e) => {
    e.preventDefault();

    const yaExiste = presupuestos.find(p => p.categoria === categoriaPresupuesto);
    if (yaExiste) {
      alert("Ya existe un presupuesto para esta categoría.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/presupuestos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          categoria: categoriaPresupuesto,
          monto: parseFloat(montoPresupuesto),
        }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      const creado = await res.json();
      setPresupuestos([...presupuestos, creado]);
      setMontoPresupuesto("");
    } catch {
      alert("Error al guardar presupuesto");
    }
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
          <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

          <label htmlFor="monto">Monto</label>
          <input type="number" id="monto" value={monto} onChange={(e) => setMonto(e.target.value)} required />

          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((c, i) => (
              <option key={i} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>

          <button type="submit" className="btn">Agregar</button>
        </form>
      </section>

      <section className="card">
        <h2>Crear nueva categoría</h2>
        <form onSubmit={handleNuevaCategoria}>
          <label htmlFor="nueva-categoria">Nombre</label>
          <input type="text" id="nueva-categoria" value={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} required />
          <button type="submit" className="btn">Crear categoría</button>
        </form>
      </section>

      <section className="card">
        <h2>Definir presupuesto por categoría</h2>
        <form onSubmit={handlePresupuesto}>
          <label htmlFor="categoria-presupuesto">Categoría</label>
          <select id="categoria-presupuesto" value={categoriaPresupuesto} onChange={(e) => setCategoriaPresupuesto(e.target.value)}>
            {categorias.map((c, i) => (
              <option key={i} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>

          <label htmlFor="monto-presupuesto">Monto mensual</label>
          <input type="number" id="monto-presupuesto" value={montoPresupuesto} onChange={(e) => setMontoPresupuesto(e.target.value)} required />
          <button type="submit" className="btn">Guardar presupuesto</button>
        </form>
      </section>

      {/* Historial de transacciones */}
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