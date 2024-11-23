import React from "react";
import SearchBarContainer from "./components/SearchBar/SearchBarContainer";
import './App.css';

function App() {
  const handleSearch = (query) => {
    console.log("Search for:", query);
    // TODO: Actually search for the query
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBarContainer onSearch={handleSearch} />
    </div>
  );
}

export default App;
