import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nombre.trim() === "" ||
      correo.trim() === "" ||
      contraseña.trim() === "" ||
      confirmar.trim() === ""
    ) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    if (contraseña !== confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contraseña }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        alert("Cuenta creada con éxito 🎉");
        navigate("/login");
      } else {
        alert(datos.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error al crear cuenta");
    }
  };

  return (
    <main className="form-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <label>Correo electrónico</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        <label>Contraseña</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
        <label>Confirmar contraseña</label>
        <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
        <button type="submit" className="btn">Registrarse</button>
      </form>
    </main>
  );
}

export default Registro;
