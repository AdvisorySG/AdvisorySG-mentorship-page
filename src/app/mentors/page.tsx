"use client";
import React from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Layout } from "@elastic/react-search-ui-views";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
} from "@elastic/react-search-ui";
import { FilterType, SortDirection } from "@elastic/search-ui";

import Canvas from "../../components/Canvas";
import ClearFacets from "../../components/ResetButton";
import ResultView from "../../components/ResultView";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "../../styles/App.css";
import { useNextRouting } from "../../utils/useNextRouting";

const App = () => {
  const WAVE = { waveId: "2024", waveName: "2024 Wave" };

  const connector = new AppSearchAPIConnector({
    engineName: "mentorship-page",
    endpointBase: "https://advisorysg.ent.ap-southeast-1.aws.found.io",
    searchKey: "search-bv3s7kksqjinbswx7g4my9ur",
  });

  const configurationOptions = {
    alwaysSearchOnInitialLoad: true,
    apiConnector: connector,
    autocompleteQuery: {
      suggestions: {
        types: {
          documents: {
            fields: ["name", "organisation", "role", "course_of_study"],
          },
        },
        size: 5,
      },
    },
    initialState: {
      resultsPerPage: 80,
      sort: [{ field: "", direction: "asc" as SortDirection }],
    },
    searchQuery: {
      result_fields: {
        course_of_study: { raw: {}, snippet: { size: 100 } },
        full_bio: { raw: {}, snippet: { size: 200, fallback: true } },
        full_image_url: { raw: {} },
        industries: { raw: {} },
        name: { raw: {}, snippet: { size: 100 } },
        organisation: { raw: {}, snippet: { size: 100 } },
        role: { raw: {}, snippet: { size: 100 } },
        school: { raw: {}, snippet: { size: 100 } },
        thumbnail_image_url: { raw: {} },
      },
      filters: [
        {
          type: "all" as FilterType,
          field: "wave_id",
          values: [WAVE.waveId],
        },
      ],
      disjunctiveFacets: ["organisation", "course_of_study"],
      facets: {
        industries: { type: "value", size: 100 },
        organisation: { type: "value", size: 100 },
        course_of_study: { type: "value", size: 100 },
      },
    },
  };

  const configWithNextRouting = useNextRouting(
    configurationOptions,
    "/mentors",
  );

  return (
    <Canvas>
      <div className="results" id="mentors">
        <SearchProvider config={configWithNextRouting}>
          <div className="App">
            <Layout
              header={
                <SearchBox
                  autocompleteSuggestions={true}
                  searchAsYouType={true}
                  debounceLength={300}
                />
              }
              bodyContent={
                <Results
                  resultView={({ result }) => <ResultView result={result} />}
                />
              }
              sideContent={
                <div>
                  <Sorting
                    label={"Sort by"}
                    sortOptions={[
                      { name: "Relevance", value: "", direction: "" },
                      { name: "Name", value: "name", direction: "asc" },
                    ]}
                  />
                  <Facet field="industries" label="Industries" />
                  <Facet
                    field="organisation"
                    filterType="any"
                    label="Organisation"
                  />
                  <Facet
                    field="course_of_study"
                    filterType="any"
                    label="Course of Study"
                  />
                  <ClearFacets />
                </div>
              }
              bodyHeader={
                <React.Fragment>
                  {<PagingInfo />}
                  <div className="search-config">
                    <ResultsPerPage options={[20, 40, 80]} />
                  </div>
                </React.Fragment>
              }
              bodyFooter={<Paging />}
            />
          </div>
        </SearchProvider>
      </div>
    </Canvas>
  );
};

export default App;
