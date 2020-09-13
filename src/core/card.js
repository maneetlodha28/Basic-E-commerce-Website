import React from "react";
import Imagehelper from "./helper/Imagehelper";

const Card = ({ product, addtoCart = true, removeFromCart = false }) => {
  const cardTitle = product ? product.name : "A T-shirt";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "DEFAULT";

  const showAddTOCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <Imagehelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          <span>&#8377;</span> {cardPrice}
        </p>
        <div className="row">
          <div className="col-12">{showAddTOCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
