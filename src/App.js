import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './components/Product';
import Cart from './components/Cart';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api.json');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarAlCarrito = (producto) => {
    const { id } = producto;
    const productoEnCarrito = carrito[id];

    if (productoEnCarrito) {
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        [id]: {
          ...productoEnCarrito,
          cantidad: productoEnCarrito.cantidad + 1,
        },
      }));
    } else {
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        [id]: {
          ...producto,
          cantidad: 1,
        },
      }));
    }
    toast.success('¡Producto agregado al carrito!');
  };

  const eliminarDelCarrito = (id) => {
    const { [id]: productoEliminado, ...restoCarrito } = carrito;
    setCarrito(restoCarrito);
  };

  const pintarFooter = () => {
    const cantidadTotal = Object.values(carrito).reduce(
      (acc, { cantidad }) => acc + cantidad,
      0
    );

    const precioTotal = Object.values(carrito).reduce(
      (acc, { cantidad, precio }) => acc + cantidad * precio,
      0
    );

    if (Object.keys(carrito).length === 0) {
      return (
        <tr>
          <th scope="row" colSpan="5">
            ¡Realiza tu Compra! - Tu Carrito esta vacío 
          </th>
        </tr>
      );
    }

    return (
      <tr>
        <th scope="row" colSpan="2">
          Total productos
        </th>
        <td>{cantidadTotal}</td>
        <td>
          <button
            className="btn btn-success btn-sm"
            onClick={() => {
              toast.success('¡Compra exitosa!');
              setCarrito({});
            }}
          >
            Comprar
          </button>
        </td>
        <td className="font-weight-bold">$ {precioTotal}</td>
      </tr>
    );
  };

  return (
    <div className="container">
      <h1 className="text-center">ESCABIA2</h1>

      <div className="my-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Acción</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <Cart
              carrito={carrito}
              setCarrito={setCarrito}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          </tbody>
          <tfoot>
            <tr id="footer-carrito">{pintarFooter()}</tr>
          </tfoot>
        </table>
      </div>
      <hr />
      <h4 className="text-center">Catálogo</h4>
      <hr />
      <div className="row">
        {productos.map((producto) => (
          <Product
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
