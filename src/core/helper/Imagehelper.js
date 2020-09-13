import React from "react";
import { API } from "../../backend";

const Imagehelper = ({ product }) => {
  //If product is not present default image
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/428311/pexels-photo-428311.jpeg?cs=srgb&dl=pexels-spencer-selover-428311.jpg&fm=jpg`;

  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default Imagehelper;
