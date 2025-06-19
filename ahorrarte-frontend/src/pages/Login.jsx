import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";


function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (correo.trim() === "" || contraseña.trim() === "") {
      alert("Por favor, completá todos los campos.");
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/api/login`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contraseña }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem("token", datos.token);
        navigate("/panel");
      } else {
        alert(datos.mensaje);
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <main className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <label htmlFor="contraseña">Contraseña</label>
        <input
          type="password"
          id="contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit" className="btn">Entrar</button>
      </form>
    </main>
  );
}

export default Login;
