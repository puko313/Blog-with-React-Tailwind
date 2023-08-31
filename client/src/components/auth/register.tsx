import React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../action/constants";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../action/authAction";

const Register = () => {
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const navigate = useNavigate();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserdata({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onsubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (userData.password === userData.repassword) {
      axios
        .post(`${BASE_URL}/api/users/register`, userData)
        .then((res) => {
          alert("successfully registered!");
          navigate("/login");
        })
        .catch((err) => {});
    } else {
      alert("password incorrect!");
    }
  };

  return (
    <>
      <form onSubmit={onsubmit}>
        <div className="w-1/4 m-auto mt-52">
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="name"
              type="text"
              id="outlined-basic"
              label="Name:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
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
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="repassword"
              type="password"
              id="outlined-basic"
              label="Re-password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <Button type="submit" variant="contained" className="ms-32">
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
