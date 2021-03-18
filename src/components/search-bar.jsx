import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";
import React, { useState } from "react";
import lunr from "lunr";

import { waves } from "../waves.json";
import { mentors, mentorIds } from "../mentors";

import "./search-bar.css";

const fields = [
  { field: "name", name: "Name" },
  { field: "role", name: "Role" },
  { field: "organization", name: "Organization" },
  { field: "school", name: "School" },
  { field: "courseOfStudy", name: "Course of Study" },
];

const createFuse = (field, waveIndex) =>
  new Fuse(
    [
      ...new Set(
        mentorIds[waveIndex].map((mentorId) => mentors[mentorId][field])
      ),
    ]
      .filter((value) => value.length > 0)
      .map((value) => ({
        name: value,
        query: { field, value },
      })),
    {
      threshold: 0.2,
      distance: 400,
      keys: ["name"],
    }
  );

// Create an array of fuse objects for each separate wave.
const fuses = waves.map((_, waveIndex) =>
  Object.fromEntries(
    fields.map(({ field }) => [field, createFuse(field, waveIndex)])
  )
);

let finalResult;
const getSuggestions = (value, waveIndex) => {
  const processedInput = value.trim();
  const searchQuery = ["role", "school", "organization"]; // Filter terms should be saved as an array of terms
  let formattedString = "";
  searchQuery.forEach((element) => {
    formattedString += `${element}:${processedInput} `;
  });
  finalResult = searchIndex.search(formattedString); // Searches name fields only
  // console.log(finalResult);
  finalResult.forEach((element) => {
    console.log(element.ref); // the name reference index of the search result is saved
  });
  const sections = fields
    .map(({ name, field }) => {
      const searchResults = fuses[waveIndex][field].search(processedInput);
      return {
        title: name,
        fields: searchResults.map(({ item }) => item),
      };
    })
    .filter((section) => section.fields.length > 0);

  const maxResults = 10;
  const computeResultsPerSection = (maxResultsPerSection) =>
    sections
      .map(({ fields }) => Math.min(fields.length, maxResultsPerSection))
      .reduce((sum, x) => sum + x, 0);

  for (let i = maxResults; i > 0; i--) {
    if (computeResultsPerSection(i) <= maxResults) {
      return sections.map(({ title, fields }) => ({
        title,
        fields: fields.slice(0, i),
      }));
    }
  }
  return [];
};
const getSectionSuggestions = (section) => section.fields;
const getSuggestionValue = (suggestion) => suggestion.name;
const renderSectionTitle = (section) => <strong>{section.title}</strong>;
const renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

function SearchBar({ value, waveIndex, onSearchChange, onSearchSelect }) {
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    onSearchChange(newValue);
  };
  const onSuggestionSelected = (event, { suggestion }) =>
    onSearchSelect(suggestion.query);
  const onSuggestionsClearRequested = () => setSuggestions([]);
  const onSuggestionsFetchRequested = ({ value }) =>
    setSuggestions(getSuggestions(value, waveIndex));

  return (
    <div className="search-bar">
      <Autosuggest
        multiSection={true}
        getSectionSuggestions={getSectionSuggestions}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        suggestions={suggestions}
        inputProps={{
          onChange,
          placeholder: `Search for mentors in ${waves[waveIndex].name}...`,
          value,
        }}
      />
    </div>
  );
}

let documents = Object.values(mentors);

var searchIndex = lunr(function () {
  this.ref("name");
  this.field("name");
  this.field("school");
  this.field("organization");
  this.field("courseOfStudy");
  this.field("role");

  documents.forEach((doc) => {
    this.add(doc);
  }, this);
});

// idx.search('oxford')
// Sample search for term oxford

export default SearchBar;
