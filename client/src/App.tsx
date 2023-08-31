import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Navbar from "./components/common/navbar";
import Dashboard from "./components/common/dashboard";
import store from "./app/store";
import Blog_list from "./components/blog/blog_list";
import Blog_detail from "./components/blog/blog_detail";
import jwtDecode from "jwt-decode";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog_list" element={<Blog_list />} />
            <Route path="/blog_detail/:id" element={<Blog_detail />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
