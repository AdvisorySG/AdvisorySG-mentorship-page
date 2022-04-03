import React from "react";

import Header from "./components/header";
import "./App.css";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

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

import ResultView from "./ResultView";

const connector = new AppSearchAPIConnector({
  engineName: "mentorship-page",
  endpointBase: "https://advisorysg.ent.ap-southeast-1.aws.found.io",
  searchKey: "search-bv3s7kksqjinbswx7g4my9ur",
});

const configurationOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  debug: true,
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          fields: ["name", "organisation", "role", "school", "course_of_study"],
        },
      },
      size: 5,
    },
  },
  searchQuery: {
    result_fields: {
      course_of_study: { snippet: { size: 100, fallback: true } },
      full_bio: { raw: {}, snippet: { size: 200, fallback: true } },
      full_image_url: { raw: {} },
      industries: { raw: {} },
      name: { snippet: { size: 100, fallback: true } },
      organisation: { snippet: { size: 100, fallback: true } },
      role: { snippet: { size: 100, fallback: true } },
      school: { snippet: { size: 100, fallback: true } },
      thumbnail_image_url: { raw: {} },
      wave_id: { raw: {} },
    },
    filters: [{ field: "wave_id", values: [1] }],
    disjunctiveFacets: ["organisation", "school", "course_of_study"],
    facets: {
      industries: { type: "value", size: 100 },
      organisation: { type: "value", size: 100 },
      school: { type: "value", size: 100 },
      course_of_study: { type: "value", size: 100 },
    },
  },
};

const App = () => (
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
      <div className="results" id="mentors">
        <SearchProvider config={configurationOptions}>
          <div className="App">
            <Layout
              header={<SearchBox autocompleteSuggestions={true} />}
              bodyContent={<Results resultView={ResultView} />}
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
                  <Facet field="school" filterType="any" label="School" />
                  <Facet
                    field="course_of_study"
                    filterType="any"
                    label="Course of Study"
                  />
                </div>
              }
              bodyHeader={
                <React.Fragment>
                  {<PagingInfo />}
                  {<ResultsPerPage />}
                </React.Fragment>
              }
              bodyFooter={<Paging />}
            />
          </div>
        </SearchProvider>
      </div>
    </div>
  </div>
);

export default App;
