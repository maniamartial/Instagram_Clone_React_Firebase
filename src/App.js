import "./App.css";
import Post from "./Post";
import React, { useState, useEffect } from "react";

import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { auth, db, storage } from "./firebase";
import { Input, Label, Form, FormGroup } from "reactstrap";
import { Container } from "reactstrap";
import { ButtonGroup } from "@material-ui/core";

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

  const singUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => error.message);
    setOpenSignIn(false);
  };

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  return (
    <div className="App">
      <Container>
        <Modal
          color="danger"
          isOpen={modal}
          toggle={toggle}
          backdropTransition={{
            timeout: 800,
          }}
          modalTransition={{
            timeout: 200,
          }}
        >
          <ModalHeader toggle={toggle}>
            {" "}
            <img
              className="app_headerImage"
              src="  https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instagram Logo"
            />
          </ModalHeader>
          <ModalBody>
            <Form inline>
              <FormGroup>
                <Label for="username" hidden>
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  type="text"
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="exampleEmail" hidden>
                  Email
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="examplePassword" hidden>
                  Password
                </Label>
                <Input name="password" placeholder="Password" type="password" />
              </FormGroup>{" "}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={singUp}>
              SignUp
            </Button>{" "}
            <Button onClick={function noRefCheck() {}} color="danger">
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          color="danger"
          isOpen={modal}
          toggle={toggle}
          backdropTransition={{
            timeout: 800,
          }}
          modalTransition={{
            timeout: 200,
          }}
        >
          <ModalHeader toggle={toggle}>
            {" "}
            <img
              className="app_headerImage"
              src="  https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instagram Logo"
            />
          </ModalHeader>
          <ModalBody>
            <Form inline>
              ]
              <FormGroup>
                <Label for="exampleEmail" hidden>
                  Email
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
              </FormGroup>{" "}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={singUp}>
              SignIn
            </Button>{" "}
            <Button onClick={function noRefCheck() {}} color="danger">
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div className="app_header">
          <img
            className="app_headerImage"
            src="  https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram Logo"
          />

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
              <Button className="btn-block" color="primary" onClick={toggle}>
                SIGN IN
              </Button>
              {""}
              <Button className="btn-block" color="primary" onClick={toggle}>
                SIGN UP
              </Button>
            </ButtonGroup>
          )}
          {"     "}
        </div>

        <h2>Stop the fuck out of ur mouth budy</h2>

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
