import { useAuth } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const ManagePizzaPage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1 className="text-center">BIENVENIDO AL ADMINISTRADOR DE PRODUCTOS</h1>
      <div className="d-flex flex-wrap align-items-center justify-content-evenly">
        <Link to="/admin/manage-menu/pizza">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnIWmRx-EEAqWiOeCYtTIRR-DsJFn2hj7HiQ&s"
              className="card-img-top"
              alt="imagen alusiva a pedidos a pizza"
            />
            <div className="card-body">
              <h5 className="card-title">Pizzas</h5>
            </div>
          </div>
        </Link>

        <Link to="">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2405/2405451.png"
              className="card-img-top"
              alt="imagen alusiva a pedidos a bebidas"
            />
            <div className="card-body">
              <h5 className="card-title">Bebidas</h5>
            </div>
          </div>
        </Link>

        <Link to="">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081903.png"
              className="card-img-top"
              alt="imagen alusiva a pedidos a postres"
            />
            <div className="card-body">
              <h5 className="card-title">Postres</h5>
            </div>
          </div>
        </Link>

        <Link to="">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5029/5029269.png"
              className="card-img-top"
              alt="imagen alusiva a pedidos a complementos"
            />
            <div className="card-body">
              <h5 className="card-title">Complementos</h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ManagePizzaPage;
