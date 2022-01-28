import React, { useEffect, useMemo, useState } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import SearchBar from "./components/search-bar";
import ScrollButton from "./components/ScrollButton";
import { fetchWaves } from "./waves";

import "./App.css";

const setHash = (hash) => window.history.replaceState({}, "", `#${hash}`);

function App() {
  const [activeWaveIndex, setActiveWaveIndex] = useState(0);
  const [waves, setWaves] = useState([new Set()]);
  const [mentors, setMentors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertIndex = (index) => waves.length - 1 - index;
  const activateTab = (tabIndex) => setActiveWaveIndex(convertIndex(tabIndex));

  const [activeMentorId, setActiveMentorId] = useState("");
  const activateModal = (waveIndex, mentorId) => {
    setActiveWaveIndex(waveIndex);
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const [hasWavesFetched, setHasWavesFetched] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await fetchWaves(setWaves, setActiveWaveIndex);
      setHasWavesFetched(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Checks hash and ensures that any modal with a corresponding name is open.
    const ensureModalFromHash = () => {
      const mentorId = window.location.hash.slice(1);
      const matchingWaves = waves
        .map((wave, waveIndex) => [wave, waveIndex])
        .filter(([wave]) => wave.has(mentorId));
      if (
        matchingWaves.length > 0 &&
        (!isModalOpen || mentorId !== activeMentorId)
      ) {
        const [, waveIndex] = matchingWaves[0];
        activateModal(waveIndex, mentorId);
        return true;
      }
    };

    // If modal is open, ensure that the hash is active.
    if (isModalOpen) {
      setHash(activeMentorId);
    } else {
      // If modal is not open and `activeMentorId === ""`, this must be the
      // initial load. Check for a hash, and open the modal if such an ID
      // exists.
      if (activeMentorId === "") {
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
  }, [isModalOpen, activeMentorId, waves]);

  const [hasSearch, setHasSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const visibleMentorIds = useMemo(
    () => (hasSearch ? searchResults : [...waves[activeWaveIndex]]),
    [hasSearch, searchResults, waves, activeWaveIndex]
  );

  return (
    <div className="container">
      <Header />

      <div className="canvas">
        <p className="disclaimer">
          <small>
            The privacy and safety of our mentors is of utmost priority to
            Advisory. Any attempt to approach or contact our mentors outside of
            the parameters of the Advisory Mentorship Programme—whilst claiming
            affiliation to Advisory, or misrepresenting a relationship to
            Advisory—will be treated as misrepresentation, even fraudulent
            misrepresentation, as considered under the Misrepresentation Act.
            Advisory will take legal action against any individuals or
            organisations who attempt to deceive, harass, or otherwise request
            dishonest assistance from our mentors.
          </small>
        </p>
        {hasWavesFetched ? (
          <div className="results">
            <SearchBar
              mentors={mentors}
              waveMentorIds={waves[activeWaveIndex]}
              setHasSearch={setHasSearch}
              setSearchResults={setSearchResults}
            />
            <Tabs
              className="tabs-container"
              selectedIndex={convertIndex(activeWaveIndex)}
              onSelect={activateTab}
            >
              <TabList>
                {waves
                  .map((wave, waveIndex) => waveIndex)
                  .reverse()
                  .map((waveIndex) => (
                    <Tab key={waveIndex}>Wave {waveIndex + 1}</Tab>
                  ))}
              </TabList>

              <p className="results-text">
                Displaying {visibleMentorIds.length} search result(s).
              </p>

              <div className="card-container">
                {visibleMentorIds.map((mentorId) => (
                  <ProfileCard
                    key={mentorId}
                    mentor={mentors[mentorId]}
                    onReadMore={() => activateModal(activeWaveIndex, mentorId)}
                  />
                ))}
              </div>
            </Tabs>
          </div>
        ) : (
          <p className="placeholder-text">Loading Mentors Available...</p>
        )}
      </div>
      <ScrollButton showBelow={200} />
      {waves.length > 0 && (
        <ProfileModal
          isOpen={isModalOpen}
          mentor={mentors[activeMentorId]}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
