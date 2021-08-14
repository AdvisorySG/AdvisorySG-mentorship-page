import React, { useEffect, useMemo, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Header from "./components/header";
import ProfileCard from "./components/profile-card";
import ProfileModal from "./components/profile-modal";
import SearchBar from "./components/search-bar";
import { fetchMentors } from "./mentors";

import "./App.css";

const setHash = (hash) => window.history.replaceState({}, "", `#${hash}`);

function App() {
  const [mentors, setMentors] = useState([]);
  const [waveIndex, setWaveIndex] = useState(mentors.length - 1);
  const [mentorIds, setMentorIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertIndex = (index) => mentors.length - 1 - index;

  const activateTab = (tabIndex) => setWaveIndex(convertIndex(tabIndex));

  const [activeMentorId, setActiveMentorId] = useState("");
  const activateModal = (mentorId) => {
    setActiveMentorId(mentorId);
    setIsModalOpen(true);
  };

  const [hasMentorsFetched, setHasMentorsFetched] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await fetchMentors(setMentors, setMentorIds);
      setHasMentorsFetched(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Checks hash and ensures that any modal with a corresponding name is open.
    const ensureModalFromHash = () => {
      const mentorId = window.location.hash.slice(1);
      if (mentors.hasOwnProperty(mentorId)) {
        if (!isModalOpen || mentorId !== activeMentorId) {
          activateModal(mentorId);
          return true;
        }
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
  }, [isModalOpen, activeMentorId, mentors]);

  const [hasSearch, setHasSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const visibleMentorIds = useMemo(
    () => (hasSearch ? searchResults : mentorIds),
    [hasSearch, searchResults, mentorIds]
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
        {hasMentorsFetched ? (
          <div className="results">
            <SearchBar
              mentors={mentors}
              setHasSearch={setHasSearch}
              setSearchResults={setSearchResults}
            />
            <Tabs
              selectedIndex={convertIndex(waveIndex)}
              onSelect={activateTab}
            >
              <TabList>
                {mentors
                  .slice()
                  .reverse()
                  .map(({ name }, i) => (
                    <Tab key={i}>{name}</Tab>
                  ))}
              </TabList>
              {mentors.map((_, i) => (
                <TabPanel key={i}>
                  <p className="results-text">
                    Displaying {visibleMentorIds.length} search result(s).
                  </p>
                  <div className="card-container">
                    {visibleMentorIds.map((mentorId) => (
                      <ProfileCard
                        key={mentorId}
                        mentor={mentors[waveIndex][mentorId]}
                        onReadMore={() => activateModal(mentorId)}
                      />
                    ))}
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          </div>
        ) : (
          <p className="placeholder-text">Loading Mentors Available...</p>
        )}
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        mentor={mentors[activeMentorId]}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
