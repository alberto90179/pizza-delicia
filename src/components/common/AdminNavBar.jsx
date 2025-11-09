import { useAuth } from "../../context/AuthContext";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const AdminNavBar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="d-flex justify-content-end gap-5 mt-3">
      <Link to="/admin/portal">
        <button className="btn btn-success ">Regresar al portal</button>
      </Link>
      <button
        className="btn btn-danger "
        onClick={() => {
          logout();
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default AdminNavBar;
