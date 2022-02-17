import "./App.css";
import Post from "./Post";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  });

  return (
    <div className="App">
      <div className="app_header">
        <img
          className="app_headerImage"
          src="  https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
        />
      </div>

      {posts.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

/*

{
      username: "Tech_maniac",
      caption: "Maniac is clever",
      imageUrl: "/static/images/avatar/1.jpg",
    },
    {
      username: "Tech_maniacc",
      caption: "Maniac is clever",
      imageUrl: "/static/images/avatar/1.jpg",
    },
    */

export default App;
