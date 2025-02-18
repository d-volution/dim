import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { useSearchQuery } from "../../api/v1/search";
import PropCardList from "./PropCardList";

function SearchResults() {
  const location = useLocation();
  const search = location.search;
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("query");
  const [title, setTitle] = useState(document.title);
  const {
    data: items,
    error,
    isFetching,
  } = useSearchQuery(query ? search : skipToken);

  useEffect(() => {
    if (query) {
      setTitle(`Dim - Query results for '${query}'`);
    }
  }, [query]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (!query) {
    return (
      <div className="card_list">
        No search query. Use the search box in the sidebar to search for media.
      </div>
    );
  }

  return (
    <PropCardList
      error={error?.toString()}
      items={items}
      title={title}
      isFetching={isFetching}
    />
  );
}

export default SearchResults;
