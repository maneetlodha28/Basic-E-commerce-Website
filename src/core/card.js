import React, { useState, useEffect } from "react";
import Imagehelper from "./helper/Imagehelper";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";
import { Redirect } from "react-router-dom";

//f=>f means fucntion(f){returns f} whatever you give it it will return it back

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const cardTitle = product ? product.name : "A T-shirt";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddTOCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success"
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
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div class="card" style={{ width: 25 + "rem" }}>
      {getARedirect(redirect)}
      <Imagehelper product={product} />
      <div class="card-body">
        <h5 class="card-title text-dark">{cardTitle}</h5>

        <p className="card-text text-dark">{cardDescription}</p>
        <p className="btn btn-success rounded  btn-sm px-4">
          <span>&#8377;</span> {cardPrice}
        </p>
        <div className="row card-footer">
          <div className="col-12">{showAddTOCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>

    // <div className="card" style={{ paddingTop: 0 + "rem" }}>
    //   <div className="card-body">
    //     {getARedirect(redirect)}
    //     <Imagehelper product={product} />
    //     <div
    //       className="card-body card-body-cascade text-center"
    //       style={{ color: "black" }}
    //     >
    //       <h5>{cardTitle}</h5>
    //     </div>
    //     <p className="card-text">{cardDescription}</p>
    //     <p className="btn btn-success rounded  btn-sm px-4">
    //       <span>&#8377;</span> {cardPrice}
    //     </p>
    //     <div className="row card-footer">
    //       <div className="col-12">{showAddTOCart(addtoCart)}</div>
    //       <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
