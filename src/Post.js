import React from "react";
import { Container, Card } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

export default function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="tech_maniacc"
          src={imageUrl}
        ></Avatar>
        <h4>{username}</h4>
      </div>

      <img className="post_image" src="logo192.png" />
      {""}
      <h4 className="post_text">
        <strong> {username}</strong> {caption}
      </h4>
    </div>
  );
}
