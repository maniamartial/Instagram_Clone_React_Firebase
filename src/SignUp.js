import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { auth, storage, db } from "./firebase";
import { Input, Label, Form, FormGroup } from "reactstrap";
import { Container } from "reactstrap";
import { ButtonGroup } from "@material-ui/core";

export default function SignUp() {
  const [modal, setModal] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const toggle = () => setModal(!modal);

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
      <Button className="btn-block" color="primary" onClick={toggle}>
        SIGN UP
      </Button>
    </div>
  );
}
