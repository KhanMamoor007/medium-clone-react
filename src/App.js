import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import CreatePost from "./component/Pages/CreatePost/CreatePost";
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
            path="/create-post"
            element={<CreatePost post={post} author={author} />}
          />

          <Route
            path="/post-details/:slug"
            element={<PostDetails post={post} author={author} />}
          />
        </Routes>
        <Alert />
      </MediumProvider>
    </Router>
  );
}

export default App;
