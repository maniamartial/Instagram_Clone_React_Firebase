import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import { storage, db } from "./firebase";

import firebase from "firebase/compat/app";

export default function ({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image to teh database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });
      }
    );
  };
  return (
    <div>
      <Input
        type="text/"
        placeholder="Enter a caption"
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <Input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}
