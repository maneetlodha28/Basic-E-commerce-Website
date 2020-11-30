import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./card";
import { loadCart } from "./helper/carthelper";
import Payment from "./Payment";
import { isAuthenticated } from "../auth/helper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false); //reloading the page

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  // const loadCheckout = () => {
  //   return (
  //     // <div>
  //     //   <h2>This section is to Checkout </h2>
  //     // </div>
  //     //
  //   );
  // };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row justify-content-center text-center">
        <div className="col-auto">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products!</h3>
          )}
        </div>
        <div className="col-auto md-col-right-2">
          <Payment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
