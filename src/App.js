import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import SearchBar from "./components/search-bar";
import { waves } from "./waves.json";
import { mentors, mentorIds } from "./mentors";

import { fieldSearch } from "./search";

import "react-tabs/style/react-tabs.css";
import "./App.css";

const setHash = (hash) => window.history.replaceState({}, "", `#${hash}`);

// Used to convert between wave and tab indices.
const convertIndex = (index) => waves.length - 1 - index;

function App() {
  const [waveIndex, setWaveIndex] = useState(waves.length - 1);
  const [visibleMentorIds, setVisibleMentorIds] = useState(
    mentorIds[waveIndex]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState("");

  useEffect(() => {
    // Checks hash and ensures that any modal with a corresponding name is open.
    const ensureModalFromHash = () => {
      const mentorId = window.location.hash.slice(1);
      if (mentors.hasOwnProperty(mentorId)) {
        if (!isModalOpen || mentorId !== activeMentorId) {
          activateTab(convertIndex(mentors[mentorId].wave));
          activateModal(mentorId);
          return true;
        }
      }
    };

    // If modal is open, ensure that the hash is active.
    if (isModalOpen) {
      setHash(activeMentorId);
    } else {
      // If modal is not open and `activeMentorId === null`, this must be the
      // initial load. Check for a hash, and open the modal if such an ID
      // exists.
      if (activeMentorId === null) {
        if (!ensureModalFromHash()) {
          // Otherwise, set a default ID, but do not open the modal.
          setActiveMentorId("");
        }
      } else {
        // An ID exists, but the modal is not open, so remove the hash.
        setHash("");
      }
    }

    // Add event listeners to catch if the user manually changes the hash.
    window.addEventListener("hashchange", ensureModalFromHash, false);
    return () =>
      window.removeEventListener("hashchange", ensureModalFromHash, false);
  }, [isModalOpen, activeMentorId]);

  const [searchValue, setSearchValue] = useState("");
  const searchChangeHandler = (input) => {
    setSearchValue(input);
    if (input.trim().length === 0) {
      setVisibleMentorIds(mentorIds[waveIndex]);
    }
  };
  const searchSelectHandler = (query) =>
    setVisibleMentorIds(fieldSearch(query, waveIndex));

  const activateTab = (tabIndex) => {
    const waveIndex = convertIndex(tabIndex);
    setWaveIndex(waveIndex);
    setVisibleMentorIds(mentorIds[waveIndex]);
    setSearchValue("");
  };

  const activateModal = (mentorId) => {
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Header />

      <SearchBar
        value={searchValue}
        waveIndex={waveIndex}
        onSearchChange={searchChangeHandler}
        onSearchSelect={searchSelectHandler}
      />

      <Tabs
        className="tabs-container"
        selectedIndex={convertIndex(waveIndex)}
        onSelect={activateTab}
      >
        <TabList>
          {/* Sort waves in descending order. */}
          {waves
            .slice()
            .reverse()
            .map(({ name }, i) => (
              <Tab key={i}>{name}</Tab>
            ))}
        </TabList>

        {waves.map((_, i) => (
          <TabPanel key={i}>
            <div className="card-container">
              {visibleMentorIds.map((mentorId) => (
                <ProfileCard
                  key={mentorId}
                  mentor={mentors[mentorId]}
                  onReadMore={() => activateModal(mentorId)}
                />
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>

      <ProfileModal
        isOpen={isModalOpen}
        mentor={mentors[activeMentorId]}
        onClose={closeHandler}
      />
    </div>
  );
}

export default App;
