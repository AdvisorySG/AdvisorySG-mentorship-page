import {
  Filter,
  RequestState,
  SearchDriverOptions,
  SortOption,
} from "@elastic/search-ui";
import { usePathname, useRouter } from "next/navigation";
var qs = require("qs");
import preserveTypesEncoder from "./preserveTypesEncoder";

export const useNextRouting = (
  config: SearchDriverOptions,
  basePathUrl: string,
) => {
  const router = useRouter();
  const pathName = usePathname();

  // From https://github.com/elastic/search-ui/blob/6583ad0c03056b3df0541d585337dfad12c16272/packages/search-ui/src/URLManager.ts#L9
  type QueryParams = {
    filters?: Filter[];
    current?: number;
    q?: string;
    size?: number;
    "sort-field"?: string;
    "sort-direction"?: string;
    sort?: SortOption[];
  };

  // From https://github.com/elastic/search-ui/blob/6583ad0c03056b3df0541d585337dfad12c16272/packages/search-ui/src/URLManager.ts#L84
  function stateToParams({
    searchTerm,
    current,
    filters,
    resultsPerPage,
    sortDirection,
    sortField,
    sortList,
  }: RequestState): QueryParams {
    const params: QueryParams = {};
    if (current !== undefined && current > 1) params.current = current;
    if (searchTerm) params.q = searchTerm;
    if (resultsPerPage) params.size = resultsPerPage;
    if (filters && filters.length > 0) {
      params["filters"] = filters;
    }
    if (sortList && sortList.length > 0) {
      params["sort"] = sortList;
    } else if (sortField) {
      params["sort-field"] = sortField;
      params["sort-direction"] = sortDirection;
    }
    return params;
  }

  // From https://github.com/elastic/search-ui/blob/6583ad0c03056b3df0541d585337dfad12c16272/packages/search-ui/src/URLManager.ts#L109
  function stateToQueryString(state: RequestState): string {
    return qs.stringify(stateToParams(state), {
      encoder: preserveTypesEncoder.encode,
    });
  }

  const routingOptions = {
    stateToUrl: (state: RequestState) => {
      // if URL contains ?uid=... then we are in modal view, and hence we should not update the URL
      if (window.location.search.includes("uid=")) {
        console.log(
          "stateToUrl :: in modal view, not updating URL. URL: ",
          window.location.href,
        );
        return window.location.search.replace("?", ""); // get the query string without the ?, eg. uid=123
      } else {
        console.log("stateToUrl :: updating URL with state: ", state);
        return stateToQueryString(state);
      }
    },
  };

  return {
    ...config,
    routingOptions,
  };
};
