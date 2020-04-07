import React, { Component } from "react";
import "./profile-card.css";

const ProfileCard = (props) => {
  return (
    <div className="profile-card">
      <div className="image-region">
        <img className="image" src={props.img_url} />
      </div>
      <div className="card-descriptors">
        <div className="name-text">{props.name}</div>
        <div className="desc-text">{props.role}</div>
        <div className="desc-text">{props.organization}</div>
      </div>
      <div>
        <button className="button">Read More</button>
      </div>
    </div>
  );
};

export default ProfileCard;
