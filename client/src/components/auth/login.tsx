import React, { FormEvent, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { SET_CURRENT_USER, BASE_URL } from "../../action/constants";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import jwt_decode from "jwt-decode";
import { json } from "body-parser";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.token) navigate("/blog_list");
  }, []);

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/users/login`, userData)
      .then((res) => {
        alert("login success!");
        localStorage.setItem("token", JSON.stringify(res.data));
        const decoded: { id: string; name: string } = jwt_decode(res.data);
        const userName = decoded.name;
        const userId = decoded.id;
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("userId", userId);
        console.log(sessionStorage.getItem("userName"));
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded,
        });
        navigate("/blog_list");
      })
      .catch((err) => {});
  };

  return (
    <>
      <form onSubmit={onsubmit}>
        <div className="w-1/4 m-auto mt-52">
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="email"
              id="outlined-basic"
              label="Email:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="password"
              type="password"
              id="outlined-basic"
              label="Password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <Button type="submit" variant="contained" className="ms-32">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};
export default Login;
