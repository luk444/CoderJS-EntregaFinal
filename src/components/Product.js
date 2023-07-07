import React from 'react';

const Product = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="col-12 col-md-4 mb-3">
      <div className="card">
        <img
          src={`/images/${producto.thumbnailUrl}`}
          className="card-img-top"
          alt={producto.title}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.title}</h5>
          <p className="card-text">$ {producto.precio}</p>
          <button
            className="btn btn-dark"
            onClick={() => agregarAlCarrito(producto)}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
