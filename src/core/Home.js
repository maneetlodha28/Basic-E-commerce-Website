import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadAllProduct = () => {
    setLoading(true);
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setProducts(data);
      }
    });
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div
          className="alert alert-info "
          style={{ textAlign: "center", marginLeft: 5 + "rem" }}
        >
          <h3>Loading...</h3>
        </div>
      )
    );
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="" description="Welcome to the T-Shirt Store">
      <div className="row text-center">
        <h2 style={{ color: "gray", fontStyle: "italic", textAlign: "start" }}>
          All T-Shirts
        </h2>
        {loadingMessage()}
        <div className="row justify-content-center">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-auto mb-3">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
