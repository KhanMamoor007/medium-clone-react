import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import EditPost from "./component/Pages/EditPost/EditPost";
import Login from "../src/component/Auth/Login";
import PostDetails from "./component/Pages/PostDetails/PostDetails";
import { MediumProvider } from "./component/context/MediumContext";
import Alert from "./component/context/Alert";

function App({ post, author }) {
  return (
    <Router>
      <MediumProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />

          <Route
            path="/EditPost"
            element={<EditPost post={post} author={author} />}
          />

          <Route
            path="/postDetails/:slug"
            element={<PostDetails post={post} author={author} />}
          />
        </Routes>
        <Alert />
      </MediumProvider>
    </Router>
  );
}

export default App;
