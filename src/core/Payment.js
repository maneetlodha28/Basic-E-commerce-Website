import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/carthelper";
import { createOrder } from "./helper/Orderhelper";
import { getmeToken, processPayment } from "./helper/paymenthelper";

import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      //   console.log("Information", info);
      //   console.log("token", token);

      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    if (isAuthenticated()) {
      return (
        <div>
          {info.clientToken !== null && products.length > 0 ? (
            <div>
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
              />
              <button
                className="btn  btn-block btn-success"
                onClick={onPurchase}
              >
                PLACE ORDER
              </button>
            </div>
          ) : (
            <h3> Add something to checkout</h3>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h3>Please Signin to place order</h3>
        </div>
      );
    }
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce; //from docs brain tree
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,

        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success });
          console.log("PAYMENT SUCCESS");
          //todo force reload
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Did we got a crash");
            setReload(!reload);
          });
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENt FAILED");
        });
    });
  };

  const getAmount = () => {
    var amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3 style={{ paddingTop: 1 + "rem" }}>
        {" "}
        {getAmount() > 0 ? "Total Amount ₹" + getAmount() : ""}
      </h3>
      {showbtdropIn()}
      {}
    </div>
  );
};

export default Payment;
