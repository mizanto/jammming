import React, { useState } from "react";
import SearchBar from "./SearchBar";

export default function SearchBarContainer({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (query.trim() === "") return;
        onSearch(query);
    };

    return (
        <SearchBar
            query={query}
            onSearch={handleSearch}
            onQueryChange={handleQueryChange}
        />
    );
}