import React from 'react';
import { toast } from 'react-toastify';

const Cart = ({ carrito, setCarrito }) => {
  const handleAgregarAlCarrito = (producto) => {
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

  const handleEliminarDelCarrito = (id) => {
    const productoEnCarrito = carrito[id];

    if (productoEnCarrito.cantidad === 1) {
      const { [id]: productoEliminado, ...restoCarrito } = carrito;
      setCarrito(restoCarrito);
    } else {
      setCarrito((prevCarrito) => ({
        ...prevCarrito,
        [id]: {
          ...productoEnCarrito,
          cantidad: productoEnCarrito.cantidad - 1,
        },
      }));
    }
    toast.error('¡Producto eliminado del carrito!');
  };

  return (
    <>
      {Object.values(carrito).map((producto) => (
        <tr key={producto.id}>
          <th scope="row">{producto.id}</th>
          <td>{producto.title}</td>
          <td>{producto.cantidad}</td>
          <td>
            <button
              className="btn btn-info btn-sm"
              onClick={() => handleAgregarAlCarrito(producto)}
            >
              +
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleEliminarDelCarrito(producto.id)}
            >
              -
            </button>
          </td>
          <td>$ {producto.precio * producto.cantidad}</td>
        </tr>
      ))}
    </>
  );
};

export default Cart;
