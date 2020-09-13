import { API } from "../../backend";

// Api means the localshost:8000/api/

export const signup = (user) => {
  return fetch(` ${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(` ${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  // A token is being set jwt i user is successfully signed. Storing it in the user browser
  if (typeof window !== "underfined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};
export const signout = (next) => {
  if (typeof window !== "underfined") {
    // removes the jwt token
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      // signout from backeend
      method: "GET",
    })
      .then((response) => console.log("Signout Success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "underfined") {
    //accessing window object, if not get return false
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")); // sending it to frontend to check if it is the smme user
  } else {
    return false;
  }
};
