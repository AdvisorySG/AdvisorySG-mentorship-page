import React, { useState } from "react";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import { mentors } from "./mentors.json";
import { search } from "./search";

import "./App.css";

const mentorIds = mentors.map((mentor, index) => index);

function App() {
  const [visibleMentorIds, setVisibleMentorIds] = useState(mentorIds);
  const searchHandler = (input) => setVisibleMentorIds(search(input));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState(0);

  const readMoreHandler = (mentorId) => {
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Header onSearch={searchHandler} />

      <ProfileModal
        isOpen={isModalOpen}
        mentor={mentors[activeMentorId]}
        onClose={closeHandler}
      />

      <div className="card-container">
        {visibleMentorIds.map((mentorId) => (
          <ProfileCard
            key={mentorId}
            mentor={mentors[mentorId]}
            onReadMore={() => readMoreHandler(mentorId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
