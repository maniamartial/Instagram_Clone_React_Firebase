import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { auth, storage, db } from "./firebase";
import { Input, Label, Form, FormGroup } from "reactstrap";
import { Container } from "reactstrap";
import { ButtonGroup } from "@material-ui/core";

export default function SignIn() {
  const [modal, setModal] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const toggle = () => setModal(!modal);

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div>
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
              <Label for="exampleEmail" hidden>
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <Input
                id="examplePasswordl"
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>{" "}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={signIn}>
            SignIn
          </Button>{" "}
          <Button onClick={function noRefCheck() {}} color="danger">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Button className="btn-block" color="primary" onClick={toggle}>
        SIGN IN
      </Button>
    </div>
  );
}
