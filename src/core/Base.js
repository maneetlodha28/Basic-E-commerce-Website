import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My title",
  description = "My Description",
  className = "bg-dark text-white p-2",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark  text-white text-center">
        <h2 className="display-">{title} </h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-2">
      <div className="conatiner-fluid bg-danger text-white text-center py-3">
        <h4>If you got any questions feel free to reach out:</h4>
        <a href="mailto:maneetlodha28@gmail.com" className="btn btn-warning">
          Contact us{" "}
        </a>
      </div>
      <div className="container">
        <span className="text-muted">
          Created By <span className="text-white">Maneet Lodha</span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
