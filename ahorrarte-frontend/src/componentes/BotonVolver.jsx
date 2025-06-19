import { useNavigate } from "react-router-dom";

function BotonVolver() {
  const navigate = useNavigate();

  return (
    <button className="btn" onClick={() => navigate(-1)}>
      ⬅ Volver
    </button>
  );
}

export default BotonVolver;
