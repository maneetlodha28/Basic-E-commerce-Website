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
    return <div></div>;
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  return (
    <div>
      <h3>Test for BT</h3>
    </div>
  );
};

export default Payment;
