import React from "react";

import {
  red,
  pink,
  deepPurple,
  indigo,
  blue,
  cyan,
  teal,
  lightGreen,
  yellow,
  deepOrange,
  brown,
  blueGrey,
} from "@mui/material/colors";
import { SearchResult } from "@elastic/search-ui";
import { htmlToText } from "html-to-text";

import ResultGridView from "./ResultGridView";
import ResultListView from "./ResultListView";
import "./ResultView.css";

// Performs intelligent snippet truncation by removing leading/trailing periods and
// whitespace, and filling with ellipsis accordingly.
const fillEllipsis = (snippet: string | null, full: string) => {
  if (!snippet) {
    return full;
  }

  const snippetRaw = htmlToText(snippet, { wordwrap: false });

  const startRegex = /^[\s.!?]+/g;
  const endRegex = /[\s.!?]+$/g;

  const snippetRawTrimmedStart = snippetRaw.replace(startRegex, "");
  const snippetRawTrimmedEnd = snippetRaw.replace(endRegex, "");

  const fullTrimmedStart = full.replace(startRegex, "");
  const fullTrimmedEnd = full.replace(endRegex, "");

  if (snippetRaw.trim() === full.trim()) {
    return snippet;
  } else if (fullTrimmedStart.indexOf(snippetRawTrimmedStart) === 0) {
    return snippet.replace(endRegex, "") + "...";
  } else if (
    fullTrimmedEnd.indexOf(snippetRawTrimmedEnd) +
      snippetRawTrimmedEnd.length ===
    fullTrimmedEnd.length
  ) {
    return "..." + snippet.replace(startRegex, "");
  } else {
    return (
      "..." + snippet.replace(startRegex, "").replace(endRegex, "") + "..."
    );
  }
};

// Fills in highlights from snippet text.
const fillHighlights = (snippet: string | null, full: string): string => {
  if (!snippet) {
    return full;
  }

  const snippetRaw = htmlToText(snippet, { wordwrap: false });
  return full.replace(snippetRaw, snippet);
};

const COLORS = [
  red,
  pink,
  deepPurple,
  indigo,
  blue,
  cyan,
  teal,
  lightGreen,
  yellow,
  deepOrange,
  brown,
  blueGrey,
].map((color) => color[200]);

const industryColors = new Map();

type DisplayResult = {
  displayName: string | null;
  displayIndustries: Array<string>;
  displayRole: string | null;
  displayOrganisation: string | null;
  displayCourseOfStudy: string | null;
  displayFullBio: string | null;
  displayShortBio: string | null;
  displaySchool: string | null;
  industryColors: Map<string, string>;
  thumbnailImageUrl?: string;
};

const ResultView = ({
  result,
  isListView,
}: {
  result: SearchResult;
  isListView: boolean;
}) => {
  const {
    course_of_study: courseOfStudy,
    full_bio: fullBio,
    industries,
    name,
    organisation,
    role,
    school,
    thumbnail_image_url,
  } = result;

  const displayCourseOfStudy =
    courseOfStudy && courseOfStudy.raw
      ? fillEllipsis(courseOfStudy.snippet, courseOfStudy.raw)
      : null;
  const displayShortBio =
    fullBio && fullBio.raw ? fillEllipsis(fullBio.snippet, fullBio.raw) : null;
  const displayFullBio =
    fullBio && fullBio.raw
      ? fillHighlights(fullBio.snippet, fullBio.raw)
      : null;
  const displayIndustries =
    industries && Array.isArray(industries.raw) ? industries.raw : [];
  const displayName =
    name && name.raw ? fillHighlights(name.snippet, name.raw) : null;
  const displayOrganisation =
    organisation && organisation.raw
      ? fillHighlights(organisation.snippet, organisation.raw)
      : null;
  const displayRole =
    role && role.raw ? fillHighlights(role.snippet, role.raw) : null;
  const displaySchool =
    school && school.raw ? fillHighlights(school.snippet, school.raw) : null;

  displayIndustries.forEach((industry: string) => {
    if (!industryColors.has(industry)) {
      industryColors.set(industry, COLORS[industryColors.size % COLORS.length]);
    }
  });

  const thumbnailImageUrl =
    thumbnail_image_url && thumbnail_image_url.raw
      ? thumbnail_image_url.raw
      : null;

  const displayResult: DisplayResult = {
    displayName,
    displayIndustries,
    displayRole,
    displayOrganisation,
    displayCourseOfStudy,
    displayFullBio,
    displayShortBio,
    displaySchool,
    industryColors,
    thumbnailImageUrl,
  };

  return isListView ? (
    <ResultListView displayResult={displayResult} />
  ) : (
    <ResultGridView displayResult={displayResult} />
  );
};

export default ResultView;
export type { DisplayResult };
