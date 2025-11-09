import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const PortalPage = () => {
  return (
    <div>
      <h1 className="text-center">PORTAL DE ADMINISTRADOR</h1>
      <br />
      <div className="d-flex flex-wrap align-items-center justify-content-evenly">
        <Link to="/admin/pedidos">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3043/3043312.png"
              className="card-img-top"
              alt="imagen alusiva a pedidos a domicilio"
            />
            <div className="card-body">
              <h5 className="card-title">Administrar pedidos</h5>
            </div>
          </div>
        </Link>

        <Link to="/admin/manage-menu">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1037/1037767.png"
              className="card-img-top"
              alt="imagen alusiva a pedidos a PRODUCTOS"
            />
            <div className="card-body">
              <h5 className="card-title">Administrar Productos</h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PortalPage;
