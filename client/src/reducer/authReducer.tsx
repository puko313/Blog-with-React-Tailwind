import { Action } from "@reduxjs/toolkit";
import { SET_CURRENT_USER, LOGOUT_USER } from "../action/constants";
interface user {
  name: string;
  email: string;
  password: string;
}

interface Authenticate {
  isAuthenticate: Boolean;
  user: Object;
}
interface Actiontype {
  type: typeof SET_CURRENT_USER;
  payload: Object;
}
const initialState = {
  isAuthenticate: false,
  user: {},
};

export default function (state = initialState, action: Actiontype) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticate: true,
        user: action.payload,
      };
    default:
      return state;
  }
}
