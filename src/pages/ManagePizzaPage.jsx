import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavBar from "../components/common/AdminNavBar";

const ManagePizzaPage = () => {
  const { user, logout } = useAuth();

  //estado para obtener el token y las pizzas

  const [userData, setUserData] = useState();
  const [allPizzas, setAllPizzas] = useState([]);
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    getPizzas();
  }, [allPizzas]);

  //estados para características de pizza
  const [namePizza, setNamePizza] = useState("");
  const [descPizza, setDescPizza] = useState("");
  const [imgPizza, setImgPizza] = useState("");

  //estado para deshabilitar campos

  const [isInputPriceDisabled, setIsInputPriceDisabled] = useState(true);
  const [isInputPizzaDisabled, setIsInputPizzaPriceDisabled] = useState(false);

  //estados para asignar precio

  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0.01);
  const [pizzaId, setPizzaId] = useState(0);

  //obtener valores de los input de pizza

  const handleNamePizzaChange = (event) => {
    setNamePizza(event.target.value);
  };

  const handleDescPizzaChange = (event) => {
    setDescPizza(event.target.value);
  };

  const handleImgPizzaChange = (event) => {
    setImgPizza(event.target.value);
  };

  //obtener los valores de precio

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  //metodo para agregar una nueva pizza

  const addPizza = async () => {
    const res = await axios
      .post(
        "https://service-pizzadelicia-v1.gulliferwd.com/api/create-pizza",
        {
          name: namePizza,
          description: descPizza,
          image_link: imgPizza,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setPizzaId(res.data.pizza_id);
        alert(
          "agregado con éxito id: " + pizzaId + "status: " + res.data.status
        );
        setIsInputPizzaPriceDisabled(true);
        setIsInputPriceDisabled(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  //metodo para agregar precio, necesita de la existencia de una pizza para vincular el id con el precio

  const addPrice = async () => {
    const res = await axios
      .post(
        "https://service-pizzadelicia-v1.gulliferwd.com/api/add-pizza-price",
        {
          pizza_id: pizzaId,
          size: size,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert(
          "precio agregado con éxito id: " +
            pizzaId +
            ", " +
            size +
            ", " +
            price
        );
      })
      .catch((error) => {
        alert(error + pizzaId + size + price);
      });
  };

  //metodo para obtener todas las pizzas

  const getPizzas = async () => {
    const res = await axios
      .get("https://service-pizzadelicia-v1.gulliferwd.com/api/menu-pizzas")
      .then((res) => {
        setAllPizzas(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //eliminar pizza
  const deletePizza = async (id) => {
    const res = axios
      .delete(
        `https://service-pizzadelicia-v1.gulliferwd.com/api/delete-pizza/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert(
          `Producto eliminado con el id: ${id}, respuesta del servidor: ${res.data.status} mensaje: ${res.data.message}`
        );
      })
      .catch((e) => {
        alert(`Error al eliminar de la base de datos, id: ${id}, Error: ${e}`);
      });
  };

  //funcion para limpiar los campos
  const clearFields = () => {
    setNamePizza("");
    setDescPizza("");
    setImgPizza("");
    setPizzaId(0);
    setSize("");
    setPrice(0.01);
    setIsInputPizzaPriceDisabled(false);
    setIsInputPriceDisabled(true);
  };

  return (
    <div className="container">
      <div className="container">
        <AdminNavBar />
        <hr />
        <div className="d-flex justify-content-between">
          <h2>AGREGAR PIZZA</h2>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              clearFields();
              e.preventDefault();
            }}
          >
            Nueva Pizza
          </button>
        </div>

        <form>
          <div className="mb-3">
            <label for="InputNamePizza" class="form-label">
              Nombre de la pizza
            </label>
            <input
              type="text"
              className="form-control"
              id="InputNamePizza"
              value={namePizza}
              onChange={handleNamePizzaChange}
              disabled={isInputPizzaDisabled}
              required
            />
          </div>
          <div className="mb-3">
            <label for="InputDescriptionPizza" class="form-label">
              Descripción
            </label>
            <input
              type="text"
              className="form-control"
              id="InputDescriptionPizza"
              value={descPizza}
              onChange={handleDescPizzaChange}
              disabled={isInputPizzaDisabled}
              required
            />
          </div>

          <div className="mb-3">
            <label for="InputImagePizza" class="form-label">
              Enlace de la imagen
            </label>
            <input
              type="text"
              className="form-control"
              id="InputImagePizza"
              value={imgPizza}
              onChange={handleImgPizzaChange}
              disabled={isInputPizzaDisabled}
              required
            />
          </div>

          <button
            className="btn btn-success"
            onClick={(e) => {
              addPizza();
              e.preventDefault();
            }}
          >
            Agregar
          </button>
        </form>
        <hr />
        <h2>AGREGAR PRECIO</h2>
        <form className="mb-3">
          <div className="mb-3">
            <label for="InputSizePizza" class="form-label">
              Nombre de la pizza
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="InputSizePizza"
              disabled={isInputPriceDisabled}
              value={size}
              onChange={handleSizeChange}
              required
            >
              <option selected>Seleccionar tamaño</option>
              <option value="chica">Chica</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>
          <div className="mb-3">
            <label for="InputPrecioPizza" class="form-label">
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="InputPrecioPizza"
              disabled={isInputPriceDisabled}
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
          <button
            className="btn btn-secondary"
            disabled={isInputPriceDisabled}
            onClick={(e) => {
              addPrice();
              setSize("");
              setPrice(0.01);
              getPizzas();
              e.preventDefault();
            }}
          >
            Asignar precio
          </button>
        </form>
      </div>
      <hr />
      <h2>Listado de productos</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Pizza</th>
            <th scope="col">Descripción</th>
            <th scope="col">Imagen</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {allPizzas.map((item) => (
            <tr key={item.id}>
              {/* Usa una clave única por fila */}
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.image_link} alt="" width="50" height="50" />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    deletePizza(item.id);
                    getPizzas();
                    e.preventDefault();
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePizzaPage;
