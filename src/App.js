import React, { useState } from "react";
import "./App.css";
import ProfileCard from "./components/profile-card";
import Header from "./components/header";
import ProfileModal from "./components/profile-modal";
// import jsonData from "./mentor-data/mentor-data.json";

function App() {
  //let mentorData = JSON.parse({ name: "puta" });

  const mentorData = [
    {
      id: 0,
      name: "Jane Doe",
      role: "MFA Student",
      organization: "SVA, New York City",
      school: "UC Irvine",
      course_of_study: "Fine Arts",
      full_bio:
        "Jane Doe is an MFA student at the School of Visual Arts, New York City. She graduated from UC Irvine in 2016, and works predominantly in Photography. Longer lines of text are usually full of extraneous words very much like this one indeed. I need this thing to be justified omg.",
      image_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
    },
    {
      id: 1,
      name: "Peter Pan",
      role: "Wizard",
      organization: "Asteroid Belt Infinity Enterprises",
      school: "Waverly Place",
      course_of_study: "Meteor Alchemy",
      full_bio:
        "Peter Pan is a meteor conjurer at the Association of Waverly Place, 0:0:1132:124932 Solar System 33148293.",
      image_url:
        "https://i.pinimg.com/originals/42/9e/9f/429e9f32eb7d0213342a4e447e6e93ae.jpg",
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalID, setModalID] = useState(null);

  const dynamicModal = (someID) => {
    if (!modalVisible) {
      return;
    }

    return (
      <ProfileModal
        id={someID}
        name={mentorData[someID].name}
        role={mentorData[someID].role}
        organization={mentorData[someID].organization}
        course_of_study={mentorData[someID].course_of_study}
        full_bio={mentorData[someID].full_bio}
        image_url={mentorData[someID].image_url}
        onClose={closeHandler}
      />
    );
  };

  const readMoreHandler = (someID) => {
    setModalVisible(true);
    setModalID(someID);
  };

  const closeHandler = () => {
    setModalVisible(false);
    setModalID(null);
  };

  return (
    <div className="page-layout">
      <Header />

      {dynamicModal(modalID)}

      <div className="profile-cards">
        {mentorData.map((mentor) => (
          <ProfileCard
            key={mentor.id}
            img_url={mentor.image_url}
            name={mentor.name}
            role={mentor.role}
            organization={mentor.organization}
            onReadMore={() => {
              readMoreHandler(mentor.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
