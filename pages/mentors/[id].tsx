import React, { useState } from "react";

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
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ResultView from "../../components/ResultView";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "../../styles/App.css";

import { useEffect } from "react";
import { Link } from "@mui/material";

import type { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import ClearFacets from "../../components/ResetButton";

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  // params contains the mentors page `id`.
  // If the route is like /mentors/1, then params.id is 1
  const tabID = context.params?.id;

  // Pass post data to the page via props
  return { props: {} };
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const pathWithParams = [{ params: { id: "0" } }, { params: { id: "1" } }];

  return {
    paths: pathWithParams,
    fallback: true,
  };
};

const App = () => {
  const isSmall = useMediaQuery("(max-width: 800px)");

  const WAVES = [
    { tabId: 0, waveId: 5, waveName: "Wave 2023" },
    { tabId: 1, waveId: 4, waveName: "VJC Mentorship 2023" },
  ];

  const [currentTabId, setCurrentTabId] = useState(0);

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
          values: [WAVES[currentTabId].waveId],
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

  const router = useRouter();

  useEffect(() => {
    const pathname = router.asPath.slice(0, 10); // slice first 10 char to match the path
    if (pathname === "/mentors/0") {
      setCurrentTabId(0);
    } else if (pathname === "/mentors/1") {
      setCurrentTabId(1);
    }
  }, [currentTabId]);

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: number) => {
    setCurrentTabId(tab);
    // FIXME: Hacky solution to identify the search button by Elastic Search UI
    // and trigger a click to reset search results
    const button = document.querySelector(
      'input[class="button sui-search-box__submit"]'
    ) as HTMLButtonElement;
    if (button) {
      button.click();
    }
  };

  return (
    <div className="results" id="mentors">
      <Header />
      <SearchProvider config={configurationOptions}>
        <div className="App">
          <Layout
            header={
              <div>
                <SearchBox
                  autocompleteSuggestions={true}
                  searchAsYouType={true}
                  debounceLength={300}
                />
                <br></br>
                <Tabs
                  value={currentTabId}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {WAVES.map(({ waveName, tabId }) => (
                    <Tab
                      key={waveName}
                      label={waveName}
                      component={Link}
                      href={tabId}
                      data-umami-event={`Tab '${waveName}'`}
                    />
                  ))}
                </Tabs>
              </div>
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
                  <ResultsPerPage />
                </div>
              </React.Fragment>
            }
            bodyFooter={<Paging />}
          />
        </div>
      </SearchProvider>
      <Footer />
    </div>
  );
};

export default App;
