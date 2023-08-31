import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state
