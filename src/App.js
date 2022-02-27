import "./App.css";
import Post from "./Post";
import React, { useState, useEffect } from "react";

import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { auth, db, storage } from "./firebase";
import { Input, Label, Form, FormGroup } from "reactstrap";
import { Container } from "reactstrap";
import { ButtonGroup } from "@material-ui/core";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ImageUpload from "./ImageUpload";
import { getAuth } from "firebase/auth";

function App() {
  const [posts, setPosts] = useState([]);

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  //Getting current user
  //const user = auth.currentUser;
  return (
    <div className="App">
      <Container>
        {user ? (
          <Button
            className="btn-block"
            color="primary"
            onClick={() => auth.signOut()}
          >
            Logout
          </Button>
        ) : (
          <ButtonGroup>
            <SignUp></SignUp>
            {""}
            <SignIn></SignIn>
            {""}
          </ButtonGroup>
        )}
        {"     "}

        <div className="app_header">
          <img
            className="app_headerImage"
            src="  https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram Logo"
          />
        </div>

        <h2>Stop the fuck out of ur mouth budy</h2>

        {user?.email ? (
          <div className="app__upload">
            <ImageUpload username={user.email} />
          </div>
        ) : (
          <center>
            <h3 className="red">Login to upload</h3>
          </center>
        )}

        {posts.map((post) => (
          <Post
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </Container>
    </div>
  );
}

/*

          {user !== null ? (
          <div>
            Hey, welcome {""}
            {user.email}
          </div>
        ) : (
          <div>Tulia broo</div>
        )}
        
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

     <script src="https://www.gstatic.com/firebasejs/6.5.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/6.5.0/firebase-auth.js"></script>
      <script src="https://www.gstatic.com/firebasejs/6.5.0/firebase-firestore.js"></script>
      <script src="https://www.gstatic.com/firebasejs/6.5.0/firebase-messaging.js"></script>
      <script src="https://www.gstatic.com/firebasejs/6.5.0/firebase-storage.js"></script>
    */

export default App;
