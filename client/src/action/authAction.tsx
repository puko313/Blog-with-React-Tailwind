import axios from "axios";
import { SET_CURRENT_USER, BASE_URL } from "./constants";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "../app/hooks";
export const registerUser = (userdata: Object) => (dispatch: void) => {
  axios
    .post(`${BASE_URL}/api/users/register`, userdata)
    .then((res) => {
      const navigate = useNavigate();
      navigate("/login");
    })
    .catch((err) => {});
};

export const loginUser = (userdata: Object) => (dispatch: void) => {
  axios
    .post(`${BASE_URL}/api/users/login`, userdata)
    .then((res) => {
      localStorage.setItem("token", res.data);
      const decoded = jwtDecode(res.data);
      console.log(typeof decoded);
      // dispatch({
      //   type: SET_CURRENT_USER,
      //   payload: decoded,
      // });
    })
    .catch((err) => {});
};
